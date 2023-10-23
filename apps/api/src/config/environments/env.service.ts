import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class Env {
  constructor(private configService: ConfigService) {}

  isProduction(): boolean {
    return this.configService.get('APP_ENV') === 'production';
  }

  get service() {
    return this.configService;
  }

  get AppEnv(): string {
    return this.configService.get('APP_ENV') as string;
  }

  get Host(): string {
    return this.configService.get('HOST') as string;
  }

  get Port(): number {
    return this.configService.get('PORT') as number;
  }

  get SentryDsn(): string {
    return this.configService.get('SENTRY_DSN') as string;
  }

  get SentryEnabled(): boolean {
    return this.configService.get('SENTRY_ENABLED') as boolean;
  }
}
