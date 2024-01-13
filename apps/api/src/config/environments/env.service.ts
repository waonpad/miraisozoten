import { Injectable } from '@nestjs/common';
import { createEnv as createT3Env } from '@t3-oss/env-core';
import { z } from 'nestjs-zod/z';

@Injectable()
export class Env {
  constructor() {
    this.env = this.createEnv();
  }

  private env: ReturnType<typeof this.createEnv>;

  private createEnv = (
    { runtimeEnv }: { runtimeEnv: NodeJS.ProcessEnv } = { runtimeEnv: process.env }
  ) => {
    return createT3Env({
      server: {
        APP_ENV: z.enum(['development', 'production', 'test']),
        HOST: z.enum(['localhost', '0.0.0.0']),
        PORT: z.coerce.number(),
        DATABASE_URL: z.string().url(),

        SENTRY_ENABLED: z.coerce.boolean(),
        // Sentryを有効にするならDSNが必須
        ...((runtimeEnv.APP_ENV === 'production' || runtimeEnv.SENTRY_ENABLED === 'true') && {
          SENTRY_DSN: z.string().url(),
        }),

        FIREBASE_PROJECT_ID: z.string(),
        FIREBASE_PRIVATE_KEY: z.string(),
        FIREBASE_CLIENT_EMAIL: z.string(),

        ...(runtimeEnv.APP_ENV !== 'production' && {
          // これが設定されていると、自動的にfirebase-adminの初期化時にemulatorを使うようになる
          FIREBASE_AUTH_EMULATOR_HOST: z.string().optional(),
        }),

        EXHIBITION: z.coerce.boolean().optional(),
      },
      clientPrefix: '',
      client: {},
      runtimeEnv: runtimeEnv,
      emptyStringAsUndefined: true,
    });
  };

  get<T extends keyof typeof Env.prototype.env>(key: T): (typeof Env.prototype.env)[T] {
    return this.env[key];
  }

  isProduction(): boolean {
    return this.env.APP_ENV === 'production';
  }
}
