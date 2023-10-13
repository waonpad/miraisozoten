const { execSync } = require('child_process');
const inquirer = require('inquirer');

// ステージングされていないファイルの一覧を取得
const getUnstagedFiles = () => {
  const output = execSync('git status -s').toString();
  const files = output
    .split('\n')
    .filter((line) => line.trim() !== '')
    .map((line) => {
      const status = line.substr(0, 2).trim();
      const file = line.slice(line.lastIndexOf(' ') + 1);
      return { status, file };
    });

  return files;
};

const main = async () => {
  const files = getUnstagedFiles();

  if (files.length === 0) {
    console.log('No unstaged files.');
    return;
  }

  const answers = await inquirer.prompt([
    {
      type: 'checkbox',
      name: 'selectedFiles',
      message: 'Select files to add:',
      choices: files.map((file) => ({
        name: `${file.status} ${file.file}`,
        value: file.file,
      })),
    },
  ]);

  if (answers.selectedFiles.length > 0) {
    execSync(`git add ${answers.selectedFiles.join(' ')}`);
    console.log(`Added files: ${answers.selectedFiles.join(', ')}`);
  } else {
    console.log('No files selected.');
  }
};

main();
