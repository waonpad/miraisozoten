import fs from 'fs';
import util from 'util';
import path from 'path';

// TODO: リファクタリング

// 都道府県データを新しく追加したときに実行するスクリプトです

// prefecture-stats ディレクトリ内のファイルを読み込み、
// index.ts に export する変数名を取得する
// schema.prisma の enum PrefectureStatsName に追加する
// schema.prisma の model PrefectureStats に追加する (小数点データがあればFloat型になる)
// prefecture-stats.enum.ts に追加する
// prefecture-stats.config.ts に追加する (すでに存在していたらスキップされる)
// game-difficulty.config.ts に追加する (すでに存在していたらスキップされる)
// db.ts に追加する

// prismaスキーマの実際の更新はこのスクリプトでは行われないため
// nps prepare.database を実行する必要がある

// schemaパッケージのビルドも行われないため、prismaの更新をしてから
// cd packages/schema && yarn build

const main = async () => {
  const readFile = util.promisify(fs.readFile);
  const writeFile = util.promisify(fs.writeFile);

  const directoryPath = path.join(
    path.resolve(process.cwd()),
    'packages/database/seed-data/prefecture-stats'
  );

  const ignoreFiles = ['index.ts', '_template.ts', 'types.ts'];

  fs.readdir(directoryPath, async (err, files) => {
    if (err) {
      return console.error('Unable to scan directory: ' + err);
    }

    const filteredFiles = files.filter((file) => !ignoreFiles.includes(file));

    const fileNameAndVariableNames: {
      fileName: string;
      variableName: string;
    }[] = [];

    console.log(filteredFiles);

    for (const file of filteredFiles) {
      const filePath = path.join(directoryPath, file);

      try {
        const data = await readFile(filePath, 'utf8');

        const match = data.match(/export const (\w+)/);

        if (match) {
          fileNameAndVariableNames.push({
            fileName: file,
            variableName: match[1],
          });
        }
      } catch (err) {
        console.error('Unable to read file: ' + err);
      }
    }

    console.log(fileNameAndVariableNames);

    const indexContent =
      fileNameAndVariableNames
        .map(
          ({ fileName, variableName }) =>
            `import { ${variableName} } from './${fileName.replace('.ts', '')}';`
        )
        .join('\n') +
      '\n\n' +
      'export const PrefectureStatsIndex = {\n' +
      fileNameAndVariableNames.map(({ variableName }) => `  ${variableName},`).join('\n') +
      '\n};\n';

    try {
      await writeFile(path.join(directoryPath, 'index.ts'), indexContent);
      console.log('index.ts has been updated.');
    } catch (err) {
      console.error('Unable to write to index.ts: ' + err);
    }

    const schemaPath = path.join(
      path.resolve(process.cwd()),
      'packages/database/prisma/schema.prisma'
    );
    const schemaData = await readFile(schemaPath, 'utf8');

    const enumStart = schemaData.indexOf('enum PrefectureStatsName {');
    const enumEnd = schemaData.indexOf('}', enumStart);
    const modelStart = schemaData.indexOf('model PrefectureStats {');
    const modelEnd = schemaData.indexOf('}', modelStart);

    const newEnumContent =
      'enum PrefectureStatsName {\n' +
      fileNameAndVariableNames
        .map(({ variableName }) => `  ${camelToSnakeCase(variableName)}`)
        .join('\n') +
      '\n}';

    let newModelContentLines: string[] = [];
    for (let i = 0; i < fileNameAndVariableNames.length; i++) {
      const { fileName, variableName } = fileNameAndVariableNames[i];
      const filePath = path.join(
        path.resolve(process.cwd()),
        'packages/database/seed-data/prefecture-stats/' + fileName
      );
      const fileData = await readFile(filePath, 'utf8');

      console.log(fileData);

      const valueMatch = fileData.match(/value:\s*(-?\d+(\.\d+)?)/g);

      console.log(valueMatch);

      const isFloat = valueMatch ? valueMatch[1].includes('.') : false;

      newModelContentLines.push(`  ${camelize(variableName)} ${isFloat ? 'Float' : 'Int'}`);
    }

    const newModelContent =
      'model PrefectureStats {\n  id         Int         @id @unique\n' +
      newModelContentLines.join('\n') +
      '\n  prefecture Prefecture?\n}';

    const newSchemaData =
      schemaData.slice(0, enumStart) +
      newEnumContent +
      schemaData.slice(enumEnd + 1, modelStart) +
      newModelContent +
      schemaData.slice(modelEnd + 1);

    try {
      await writeFile(schemaPath, newSchemaData);
      console.log('schema.prisma has been updated.');
    } catch (err) {
      console.error('Unable to write to schema.prisma: ' + err);
    }

    const enumFilePath = path.join(
      path.resolve(process.cwd()),
      'packages/schema/src/prefecture/stats/prefecture-stats.enum.ts'
    );

    const newEnumFileContent =
      'export const PrefectureStatsName = [\n' +
      fileNameAndVariableNames
        .map(({ variableName }) => `  '${camelToSnakeCase(variableName)}'`)
        .join(',\n') +
      '\n] as const;\n\n' +
      'export type PrefectureStatsName = (typeof PrefectureStatsName)[number];\n';

    try {
      await writeFile(enumFilePath, newEnumFileContent);
      console.log('prefecture-stats.enum.ts has been updated.');
    } catch (err) {
      console.error('Unable to write to prefecture-stats.enum.ts: ' + err);
    }

    const configFilePath = path.join(
      path.resolve(process.cwd()),
      'packages/schema/src/prefecture/stats/prefecture-stats.config.ts'
    );
    let oldConfigFileContent = await readFile(configFilePath, 'utf8');

    let insertionPointIndex = oldConfigFileContent.indexOf('} as const');
    if (insertionPointIndex === -1) {
      console.error('Unable to find insertion point in prefecture-stats.config.ts');
      return;
    }

    let newContent = '';
    for (const { fileName, variableName } of fileNameAndVariableNames) {
      const filePath = path.join(
        path.resolve(process.cwd()),
        'packages/database/seed-data/prefecture-stats/' + fileName
      );
      const fileData = await readFile(filePath, 'utf8');

      const labelMatch = fileData.match(/label: '(.+)',/);
      const unitMatch = fileData.match(/unit: '(.+)',/);

      const label = labelMatch ? labelMatch[1] : '';
      const unit = unitMatch ? unitMatch[1] : '';

      const snakeCaseVariableName = camelToSnakeCase(variableName);
      if (!oldConfigFileContent.includes(snakeCaseVariableName)) {
        newContent += `  ${snakeCaseVariableName}: {\n    name: '${snakeCaseVariableName}',\n    camel: '${camelize(
          variableName
        )}',\n    label: '${label}',\n    unit: '${unit}',\n  },\n`;
      }
    }

    let newConfigFileContent =
      oldConfigFileContent.slice(0, insertionPointIndex) +
      newContent +
      oldConfigFileContent.slice(insertionPointIndex);

    try {
      await writeFile(configFilePath, newConfigFileContent);
      console.log('prefecture-stats.config.ts has been updated.');
    } catch (err) {
      console.error('Unable to write to prefecture-stats.config.ts: ' + err);
    }

    const gameDifficultyConfigFilePath = path.join(
      path.resolve(process.cwd()),
      'packages/schema/src/todoufuken/game/game-difficulty.config.ts'
    );
    let oldGameDifficultyConfigFileContent = await readFile(gameDifficultyConfigFilePath, 'utf8');

    insertionPointIndex = oldGameDifficultyConfigFileContent.indexOf('  } satisfies {');
    if (insertionPointIndex === -1) {
      console.error('Unable to find insertion point in game-difficulty.config.ts');
      return;
    }

    newContent = '';
    for (const { variableName } of fileNameAndVariableNames) {
      const snakeCaseVariableName = camelToSnakeCase(variableName);
      if (!oldGameDifficultyConfigFileContent.includes(snakeCaseVariableName)) {
        newContent += `    ${snakeCaseVariableName}: 'EASY',\n`;
      }
    }

    let newGameDifficultyConfigFileContent =
      oldGameDifficultyConfigFileContent.slice(0, insertionPointIndex) +
      newContent +
      oldGameDifficultyConfigFileContent.slice(insertionPointIndex);

    try {
      await writeFile(gameDifficultyConfigFilePath, newGameDifficultyConfigFileContent);
      console.log('game-difficulty.config.ts has been updated.');
    } catch (err) {
      console.error('Unable to write to game-difficulty.config.ts: ' + err);
    }

    const mswDataDBFilePath = path.join(
      path.resolve(process.cwd()),
      'apps/web/src/__mocks__/server/db.ts'
    );
    let oldMswDataDBFileContent = await readFile(mswDataDBFilePath, 'utf8');

    let insertionStartPointIndex = oldMswDataDBFileContent.indexOf('  prefectureStats: {');
    if (insertionStartPointIndex === -1) {
      console.error('Unable to find insertion point in db.ts');
      return;
    }

    let insertionEndPointIndex = oldMswDataDBFileContent.indexOf(
      '  } satisfies {\n    [K in keyof PrefectureStats]: unknown;'
    );
    if (insertionEndPointIndex === -1) {
      console.error('Unable to find insertion point in db.ts');
      return;
    }

    newContent = '';
    for (const { variableName } of fileNameAndVariableNames) {
      const snakeCaseVariableName = camelize(variableName);
      if (!oldMswDataDBFileContent.includes(snakeCaseVariableName)) {
        newContent += `    ${snakeCaseVariableName}: Number,\n`;
      }
    }

    let newMswDataDBFileContent =
      oldMswDataDBFileContent.slice(0, insertionStartPointIndex) +
      '  prefectureStats: {\n' +
      '    id: primaryKey(Number),\n' +
      newContent +
      oldMswDataDBFileContent.slice(insertionEndPointIndex);

    try {
      await writeFile(mswDataDBFilePath, newMswDataDBFileContent);
      console.log('db.ts has been updated.');
    } catch (err) {
      console.error('Unable to write to db.ts: ' + err);
    }
  });
};

main();

function camelToSnakeCase(str: string) {
  return str
    .replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`)
    .toUpperCase()
    .replace(/^_/, '');
}

function camelize(str: string) {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
      return index === 0 ? word.toLowerCase() : word.toUpperCase();
    })
    .replace(/\s+/g, '');
}
