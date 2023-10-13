import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { ZodValidationPipe } from 'nestjs-zod';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { EnvModule } from './config/environments/env.module';
import { ZodValidationExceptionFilter } from './filters/zod-validation-exception.filter';
import { LoggerInterceptor } from './interceptors/logging.inspector';
import { LoggerModule } from './logger/logger.module';
import { UserMiddleware } from './user/user.middleware';
import { WeaponsModule } from './weapons/weapons.module';

@Module({
  //importsは他のModuleでexportされたProviderを自身のModule内で使えるようにする
  imports: [WeaponsModule, LoggerModule, EnvModule, AuthModule],
  //インスタンス化して、Controllerが何かを定義している
  controllers: [AppController],
  //インスタンス化して、このModule内で使用する可能性のあるproviderを定義している
  providers: [
    AppService,
    { provide: APP_INTERCEPTOR, useClass: LoggerInterceptor },
    {
      provide: APP_PIPE,
      useClass: ZodValidationPipe,
    },
    {
      provide: APP_FILTER,
      useClass: ZodValidationExceptionFilter,
    },
  ],
  //他のModuleで使いたいProviderを定義する
  // exports: ,
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // 全てのエンドポイントに対して、UserMiddlewareを適用する
    consumer.apply(UserMiddleware).forRoutes('*');
  }
}
