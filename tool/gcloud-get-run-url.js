const { execSync } = require('child_process');
const path = require('path');

require('dotenv').config({ path: path.resolve(process.cwd(), '.env') });
const env = process.env;

const serviceName = env.GC_RUN_SERVICE;

const main = async () => {
  try {
    const stdout = execSync(`gcloud run services list --format="value(SERVICE, URL)"`);
    const lines = stdout.toString().split('\n');
    const line = lines.find((l) => l.startsWith(`${serviceName}\t`));
    const url = line.split('\t')[1];

    console.log(`Service URL: ${url}`);
  } catch (e) {
    console.log(e);
  }
};

main();
