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
    return this.configService.get('APP_ENV');
  }

  get Host(): string {
    return this.configService.get('HOST');
  }

  get Port(): number {
    return this.configService.get('PORT');
  }
}
