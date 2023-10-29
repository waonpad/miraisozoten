import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppEnvEnum } from './constants/app-env.enum';
import { BooleanEnum } from './constants/boolean.enum';
import { HostEnum } from './constants/host.enum';

@Injectable()
export class Env {
  constructor(private configService: ConfigService) {}

  isProduction(): boolean {
    return this.configService.get('APP_ENV') === 'production';
  }

  get service() {
    return this.configService;
  }

  get AppEnv(): AppEnvEnum {
    return this.configService.get('APP_ENV') as AppEnvEnum;
  }

  get Host(): HostEnum {
    return this.configService.get('HOST') as HostEnum;
  }

  get Port(): number {
    return this.configService.get('PORT') as number;
  }

  get SentryDsn(): string {
    return this.configService.get('SENTRY_DSN') as string;
  }

  get SentryEnabled(): BooleanEnum {
    return this.configService.get('SENTRY_ENABLED') as BooleanEnum;
  }
}
