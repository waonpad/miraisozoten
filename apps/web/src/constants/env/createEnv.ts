import { createEnv as createT3Env } from '@t3-oss/env-core';
import { z } from 'zod';

export const createEnv = ({ runtimeEnv }: { runtimeEnv: NodeJS.ProcessEnv }) => {
  return createT3Env({
    server: {},
    clientPrefix: 'VITE_',
    client: {
      VITE_APP_ENV: z.enum(['development', 'production', 'test']),
      VITE_API_URL: z.string().url(),
      VITE_APP_NAME: z.string(),
      VITE_HOST_URL: z.string().url(),

      VITE_GOOGLE_CLIENT_ID: z.string(),
    },
    runtimeEnv: runtimeEnv,
    emptyStringAsUndefined: true,
  });
};
