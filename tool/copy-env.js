const { join, dirname, basename, resolve, normalize } = require('path');
const glob = require('glob');
const { copyFileSync, unlinkSync, existsSync } = require('fs');

let copiedFilesHistory = [];
let filesToCopy = [];
let existingFilesBeforeCopy = [];

const prepareCopyFile = (from, to) => {
  const normalizedFrom = normalize(from);
  const normalizedTo = normalize(to);

  filesToCopy.push({ from: normalizedFrom, to: normalizedTo });
};

const shouldOverwrite = () => {
  return process.argv.includes('--overwrite');
};

const executeCopy = () => {
  for (const { from, to } of filesToCopy) {
    if (existsSync(to) && !shouldOverwrite()) {
      console.log(`File ${to} already exists. Skipping copy.`);
      existingFilesBeforeCopy.push(to);
      continue;
    } else if (existsSync(to)) {
      existingFilesBeforeCopy.push(to);
    }

    try {
      copyFileSync(from, to);
      copiedFilesHistory.push(to);
    } catch (err) {
      console.error(`Error copying file from ${from} to ${to}:`, err.message);
      rollback();
      process.exit(1);
    }
  }
};

const rollback = () => {
  console.log('Rolling back due to an error...');
  for (let i = copiedFilesHistory.length - 1; i >= 0; i--) {
    const filePath = copiedFilesHistory[i];
    if (existsSync(filePath)) {
      unlinkSync(filePath);
      console.log(`Deleted ${filePath}`);
    }
  }
};

const getDirs = (pattern) => {
  const rootDir = normalize(process.cwd());
  return glob.sync(pattern, {
    cwd: rootDir,
    absolute: true,
    onlyDirectories: true,
  });
};

const getFiles = (dir, pattern) => {
  return glob.sync(pattern, {
    cwd: normalize(dir),
    absolute: true,
  });
};

const prepareCopyEnvFiles = (pattern) => {
  const dirs = getDirs(pattern);
  dirs.forEach((dir) => {
    const envFiles = getFiles(dir, '.env.*example');
    envFiles.forEach((envFile) => {
      const envDest = join(dirname(envFile), basename(envFile).replace('.example', ''));
      prepareCopyFile(envFile, envDest);
    });
  });
};

const getInputDirs = () => {
  const dirArgIndex = process.argv.indexOf('--dir');
  if (dirArgIndex === -1 || dirArgIndex === process.argv.length - 1) {
    console.error('Please specify one or more directories with --dir');
    process.exit(1);
  }
  return process.argv.slice(dirArgIndex + 1);
};

function main() {
  console.log('========================================');
  console.log('Preparing env files to copy');
  console.log('========================================');

  const inputDirs = getInputDirs();

  inputDirs.forEach((dir) => {
    prepareCopyEnvFiles(resolve(process.cwd(), dir));
  });

  console.log(filesToCopy.map((file) => file.from));

  executeCopy();

  console.log('========================================');
  console.log('Copied files:');
  console.log(copiedFilesHistory);
  console.log('Files already existing before copy:');
  console.log(existingFilesBeforeCopy);
  console.log('========================================');
}

main();
