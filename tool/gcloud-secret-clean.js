const { execSync } = require('child_process');
const path = require('path');

require('dotenv').config({ path: path.resolve(process.cwd(), '.env') });
const env = process.env;

const gcSecrets = Object.entries(env).filter(([key, value]) => key.startsWith('GC_SECRET_'));

const deleteSecret = (secretName) => {
  try {
    const deleteCommand = `gcloud secrets delete ${secretName} --quiet`;

    console.log(deleteCommand);

    execSync(deleteCommand);

    console.log(`シークレット ${secretName} を削除しました。`);
  } catch (e) {
    console.log(`シークレット ${secretName} が存在しません。`);
  }
};

const main = async () => {
  try {
    for (const [key, value] of gcSecrets) {
      const secretName = key.replace('GC_SECRET_', '');
      deleteSecret(secretName);
    }
  } catch (e) {
    console.log(e);
  }
};

main();
