import { writeFileSync } from 'fs';
import * as path from 'path';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { dump } from 'js-yaml';
import { AppModule } from './app.module';
import { Env } from './config/environments/env.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const env: Env = app.get(Env);

  app.enableCors({
    origin: '*',
    allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
  }); // CORSを有効化

  app.useGlobalPipes(
    // DTOによるバリデーションで、型変換を自動で行う
    new ValidationPipe({
      transform: true,
    })
  );

  // Setting Swagger API
  const config = new DocumentBuilder()
    .setTitle('DQ Weapons API')
    .setDescription('The DQ Weapons API description')
    .setVersion('1.0')
    .build();

  // Create API Document
  const document = SwaggerModule.createDocument(app, config);

  // API Doc Endpoint
  SwaggerModule.setup('api', app, document);

  const openApiOutputPath = path.resolve(process.cwd(), 'openapi.yml');
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  writeFileSync(openApiOutputPath, dump(document, {}));

  await app.listen(env.Port, env.Host);
}
bootstrap();
