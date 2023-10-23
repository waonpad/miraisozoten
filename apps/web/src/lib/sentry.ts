import * as Sentry from '@sentry/react';

import { env } from '@/constants/env';

export const initSentry = () => {
  if (
    env.VITE_SENTRY_DSN &&
    (env.VITE_APP_ENV === 'production' || env.VITE_SENTRY_ENABLED === 'true')
  ) {
    Sentry.init({
      dsn: env.VITE_SENTRY_DSN,
    });

    console.log('Sentry initialized');
  }
};

export * from '@sentry/react';
