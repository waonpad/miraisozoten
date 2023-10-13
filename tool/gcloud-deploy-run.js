const { execSync } = require('child_process');
const path = require('path');

require('dotenv').config({ path: path.resolve(process.cwd(), '.env') });
const env = process.env;

const gcRunEnvs = Object.entries(env).filter(([key, value]) => key.startsWith('GC_RUN_ENV_'));
const gcSecrets = Object.entries(env).filter(([key, value]) => key.startsWith('GC_SECRET_'));

const main = async () => {
  const command = `gcloud run deploy ${env.GC_RUN_SERVICE} \
  --image gcr.io/${env.GC_PROJECT_ID}/${env.GC_DOCKER_IMAGE} \
  --region asia-northeast1 \
  --platform managed \
  --allow-unauthenticated \
  --service-account ${env.GC_SERVICE_ACCOUNT} \
  --port ${env.GC_RUN_PORT} \
  ${gcRunEnvs
    .map(([key, value]) => `--update-env-vars ${key.replace('GC_RUN_ENV_', '')}=${value}`)
    .join(' ')} \
  ${gcSecrets
    .map(
      ([key, value]) =>
        `--update-secrets ${key.replace('GC_SECRET_', '')}=${key.replace('GC_SECRET_', '')}:latest`
    )
    .join(' ')}
  `;

  execSync(command, { stdio: 'inherit' });
};

main();
