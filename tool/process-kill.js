const { execSync } = require('child_process');
const { exit } = require('process');

const processKill = {
  win32: (port) => {
    const command = `netstat -ano | findstr :${port}`;
    const result = execSync(command).toString().trim().split('\n')[0];

    const processId = result.split(' ').pop();

    const command2 = `taskkill /PID ${processId} /F`;
    const result2 = execSync(command2).toString();

    return `Killed process ${processId} on port ${port}`;
  },
  darwin: (port) => {
    const command = `lsof -i :${port}`;
    const result = execSync(command).toString().trim().split('\n')[1];

    const processId = result.split(' ').pop();

    const command2 = `kill -9 ${processId}`;
    const result2 = execSync(command2).toString();

    return `Killed process ${processId} on port ${port}`;
  },
  linux: (port) => {
    const command = `lsof -i :${port}`;
    const result = execSync(command).toString().trim().split('\n')[1];

    const processId = result.split(' ').pop();

    console.log(`Killing process ${processId} on port ${port}`);

    const command2 = `kill -9 ${processId}`;
    const result2 = execSync(command2).toString();

    return `Killed process ${processId} on port ${port}`;
  },
};

const main = async () => {
  const port = process.argv[2];
  if (!port) {
    console.error('Please provide a port number as an argument');
    return;
  }

  try {
    const res = processKill[process.platform](port);

    console.log(res);

    console.log('Done');
  } catch (e) {
    console.log('port is not used');
    exit(0);
  }
};

main();
