import { writeFileSync } from 'fs';
import * as path from 'path';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as Sentry from '@sentry/node';
import * as admin from 'firebase-admin';
import { ServiceAccount } from 'firebase-admin';
import { dump } from 'js-yaml';
import { AppModule } from './app.module';
import { Env } from './config/environments/env.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const env: Env = app.get(Env);

  // Sentry
  if (env.get('SENTRY_DSN') && (env.isProduction() || env.get('SENTRY_ENABLED') === 'true')) {
    console.log('Sentry enabled');

    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    Sentry.init({
      dsn: env.get('SENTRY_DSN'),
    });
  }

  // Firebase Admin SDK
  const adminConfig: ServiceAccount = {
    projectId: env.get('FIREBASE_PROJECT_ID'),
    privateKey: env.get('FIREBASE_PRIVATE_KEY').replace(/\\n/g, '\n'),
    clientEmail: env.get('FIREBASE_CLIENT_EMAIL'),
  };

  // FIREBASE_AUTH_EMULATOR_HOSTが設定されている場合、自動的にエミュレーターを使用する
  admin.initializeApp({
    credential: admin.credential.cert(adminConfig),
  });

  // CORS
  app.enableCors({
    origin: '*',
    allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
  });

  // Setting Swagger API
  const config = new DocumentBuilder()
    .setTitle('API Doc')
    .setDescription('API Doc Description')
    .setVersion('1.0')
    .build();

  // Create API Document
  const document = SwaggerModule.createDocument(app, config);

  // API Doc Endpoint
  SwaggerModule.setup('api', app, document);

  const openApiOutputPath = path.resolve(process.cwd(), 'openapi.yml');
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  writeFileSync(openApiOutputPath, dump(document, {}));

  await app.listen(env.get('PORT'), env.get('HOST'));
}
bootstrap();
