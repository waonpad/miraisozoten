// このスクリプトを実行しても、使わなくなったシークレットや、更新前のバージョンは残り続けます

const fs = require('fs');

const { execSync } = require('child_process');
const path = require('path');

require('dotenv').config({ path: path.resolve(process.cwd(), '.env') });
const env = process.env;

const gcSecrets = Object.entries(env).filter(([key, value]) => key.startsWith('GC_SECRET_'));

const createTxtFile = (key, value) => {
  const secretName = key.replace('GC_SECRET_', '');
  const secretFilePath = path.resolve(process.cwd(), `./tmp/gcloud/${secretName}.txt`);

  const secretValue = value;

  fs.writeFileSync(secretFilePath, secretValue);
};

const updateSecret = (secretName) => {
  const updateCommand = `gcloud secrets versions add ${secretName} --data-file=./tmp/gcloud/${secretName}.txt`;

  console.log(updateCommand);

  execSync(updateCommand);

  console.log(`シークレット ${secretName} を更新しました。`);
};

const createSecret = (secretName) => {
  const createCommand = `gcloud secrets create ${secretName} --data-file=./tmp/gcloud/${secretName}.txt`;

  console.log(createCommand);

  execSync(createCommand);

  console.log(`シークレット ${secretName} を作成しました。`);
};

const main = async () => {
  try {
    // フォルダを作成
    if (!fs.existsSync(path.resolve(process.cwd(), './tmp/gcloud'))) {
      fs.mkdirSync(path.resolve(process.cwd(), './tmp/gcloud'));
    }

    for (const [key, value] of gcSecrets) {
      const secretValue = value;

      const secretName = key.replace('GC_SECRET_', '');
      const command = `gcloud secrets versions access latest --secret=${secretName}`;
      console.log(command);
      try {
        const result = execSync(command, { encoding: 'utf8' });
        const currentSecretValue = result.trim();

        console.log(`シークレット ${secretName} の現在の値は ${currentSecretValue} です。`);

        if (currentSecretValue !== secretValue) {
          createTxtFile(key, value);

          updateSecret(secretName);
        } else {
          console.log(`シークレット ${secretName} は変更の必要がありません。`);
        }
      } catch (e) {
        createTxtFile(key, value);

        if (e.stderr.includes('DESTROYED state') || e.stderr.includes('DISABLED state')) {
          updateSecret(secretName);
        } else {
          createSecret(secretName);
        }
      }
    }
  } finally {
    if (fs.existsSync(path.resolve(process.cwd(), './tmp/gcloud'))) {
      fs.rmdirSync(path.resolve(process.cwd(), './tmp/gcloud'), { recursive: true });
    }
  }
};

main();
