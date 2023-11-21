import { createEnv as createT3Env } from '@t3-oss/env-core';
import { z } from 'zod';

export const createEnv = ({ runtimeEnv }: { runtimeEnv: NodeJS.ProcessEnv }) => {
  return createT3Env({
    server: {},
    clientPrefix: 'VITE_',
    client: {
      VITE_APP_ENV: z.enum(['development', 'production', 'test', 'ci']),
      VITE_API_URL: z.string().url(),
      VITE_APP_NAME: z.string(),
      VITE_HOST_URL: z.string().url(),

      VITE_SENTRY_ENABLED: z.enum(['true', 'false']),
      // Sentryを有効にするならDSNが必須
      ...((runtimeEnv.VITE_APP_ENV === 'production' ||
        runtimeEnv.VITE_SENTRY_ENABLED === 'true') && {
        VITE_SENTRY_DSN: z.string().url(),
      }),

      VITE_FIREBASE_API_KEY: z.string(),
      VITE_FIREBASE_AUTH_DOMAIN: z.string(),
      VITE_FIREBASE_PROJECT_ID: z.string(),
      VITE_FIREBASE_APP_ID: z.string(),

      // productionでないならモックを有効にするかの指定が必須
      ...(runtimeEnv.VITE_APP_ENV !== 'production' && {
        VITE_API_MOCKING: z.enum(['true', 'false']),

        VITE_FIREBASE_EMULATOR_ENABLED: z.enum(['true', 'false']),

        ...((runtimeEnv.VITE_FIREBASE_EMULATOR_ENABLED === 'true' ||
          runtimeEnv.VITE_API_MOCKING === 'true') && {
          VITE_FIREBASE_AUTH_EMULATOR_HOST: z.string(),
        }),
      }),
    },
    runtimeEnv: runtimeEnv,
    emptyStringAsUndefined: true,
  });
};
