const path = require('path');

const root = (target) => path.resolve(__dirname, target);

try {
  require('dotenv').config({ path: root('.env') });
} catch (e) {
  console.log('dotenv is not installed');
}
const env = process.env;

const apiPath = root('apps/api');
const webPath = root('apps/web');

const ciApiPath = root('out/apps/api');
const ciWebPath = root('out/apps/web');

const databasePath = root('packages/database');

module.exports = {
  scripts: {
    // 事前準備
    prepare: {
      default: `nps prepare.env prepare.deps prepare.packages prepare.apps`,
      env: {
        default: `node ${root('tool/copy-env.js')} --dir ./ ./apps/* ./packages/*`,
      },
      deps: `yarn install --frozen-lockfile && yarn husky install`,
      docker: `docker compose up -d`,
      packages: `nps prepare.database`,
      database: `docker compose up -d && nps prisma.generate prisma.migrate.dev prisma.build`,
      apps: ``,
      ci: {
        web: `npx turbo prune web && cd out && yarn install --frozen-lockfile`,
        api: `npx turbo prune api && cd out && yarn install --frozen-lockfile`,
        database: `npx turbo prune database && cd out && yarn install --frozen-lockfile`,
      },
    },
    test: {
      default: `nps test.web test.api`,
      web: `cd ${webPath} && yarn test`,
      api: `cd ${apiPath} && yarn test`,
      dredd: `cd ${apiPath} && dredd`,
      ci: {
        default: `nps test.ci.web test.ci.api`,
        web: `cd ${ciWebPath} && yarn test:ci`,
        api: `cd ${ciApiPath} && yarn test:ci`,
      },
      watch: {
        default: `nps test.watch.web test.watch.api`,
        web: `cd ${webPath} && yarn test:watch`,
        api: `cd ${apiPath} && yarn test:watch`,
      },
    },
    prisma: {
      generate: `cd ${databasePath} && npx prisma generate`,
      studio: `cd ${databasePath} && npx prisma studio`,
      migrate: {
        dev: `cd ${databasePath} && npx prisma migrate dev`,
      },
      build: {
        default: `cd ${databasePath} && yarn build`,
      },
    },
    build: {
      default: 'npx turbo run build',
      ci: {
        web: 'cd out && npm run build',
        api: 'cd out && npm run build',
        database: 'cd out && npm run build',
      },
    },
    lint: {
      default: `nps lint.eslint lint.style lint.prettier`,
      eslint: `turbo lint`,
      style: `yarn stylelint "**/*.{css,scss}" --fix`,
      prettier: `yarn fornmat`,
    },
    docker: {
      build: {
        // webはVerelにホスティングするので不要
        // default: 'nps docker.build.web docker.build.api',
        // web: `docker build -t web . -f ${webPath}/Dockerfile`,
        api: `docker build -t ${env.GC_DOCKER_IMAGE} . -f ${apiPath}/Dockerfile`,
      },
      // マルチステージビルドで作成された中間イメージを削除する
      rmnone: {
        default: 'docker rmi $(docker images -f "dangling=true")',
      },
    },
    // 開発サーバー起動
    dev: 'docker compose up -d && npx turbo run dev --parallel --no-daemon',
    // git関連
    g: {
      a: `node ${root('tool/git-easy-add.js')}`,
    },
    // gcloud関連
    gc: {
      auth: `gcloud auth login`,
      project: {
        create: `gcloud projects create ${env.GC_PROJECT_ID}`,
        set: `gcloud config set project ${env.GC_PROJECT_ID}`,
      },
      billing: {
        link: `gcloud billing projects link ${env.GC_PROJECT_ID} --billing-account=${env.GC_BILLING_ACCOUNT_ID}`,
      },
      secret: {
        enable: `gcloud services enable secretmanager.googleapis.com`,
        role: {
          add: `gcloud projects add-iam-policy-binding ${env.GC_PROJECT_ID} --member=serviceAccount:${env.GC_SERVICE_ACCOUNT} --role=roles/secretmanager.secretAccessor`,
        },
        deploy: `node ${root('tool/gcloud-deploy-secret.js')}`,
      },
      docker: {
        auth: `gcloud auth configure-docker`,
        enable: `gcloud services enable containerregistry.googleapis.com`,
        role: {
          add: `gcloud projects add-iam-policy-binding ${env.GC_PROJECT_ID} --member=user:${env.GC_GOOGLE_ACCOUNT} --role=roles/storage.admin`,
        },
        tag: `docker tag ${env.GC_DOCKER_IMAGE} gcr.io/${env.GC_PROJECT_ID}/${env.GC_DOCKER_IMAGE}`,
        push: `docker push gcr.io/${env.GC_PROJECT_ID}/${env.GC_DOCKER_IMAGE}`,
      },
      run: {
        role: {
          add: `gcloud projects add-iam-policy-binding ${env.GC_PROJECT_ID} --member=serviceAccount:${env.GC_SERVICE_ACCOUNT} --role=roles/iam.serviceAccountUser`,
        },
        deploy: `node ${root('tool/gcloud-deploy-run.js')}`,
        url: `node ${root('tool/gcloud-get-run-url.js')}`,
      },
    },
    util: {
      gensec: `node ${root('tool/gen-secret.js')}`,
      upnxsec: `node ${root('tool/update-nextauth-secret.js')}`,
      pkill: {
        api: `node ${root('tool/process-kill.js')} 3000`,
      },
    },
  },
};
