import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Env } from './env.service';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      // eslint-disable-next-line turbo/no-undeclared-env-vars
      envFilePath: ['.env', ...(process.env.APP_ENV !== 'production' ? [`.env.test.local`] : [])],
      isGlobal: true,
    }),
  ],
  providers: [Env],
  exports: [Env],
})
export class EnvModule {}
