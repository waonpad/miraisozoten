import { Suspense } from 'react';

import { QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';
import { HelmetProvider } from 'react-helmet-async';

import { AuthGuard } from '@/auth/auth-guard';
import { AuthProvider } from '@/auth/auth-provider';
import { ErrorFallback } from '@/components/elements/error-fallback';
import { SuspenseFallback } from '@/components/elements/suspense-fallback';
import { queryClient } from '@/lib/react-query';
import * as Sentry from '@/lib/sentry';

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    // SentryのErrorBoundaryで捕まえるので、react-error-boundaryのfallbackは空にしておく
    <ErrorBoundary fallbackRender={() => <></>}>
      <Sentry.ErrorBoundary fallback={ErrorFallback}>
        <Suspense fallback={<SuspenseFallback />}>
          <HelmetProvider>
            <QueryClientProvider client={queryClient}>
              <AuthProvider>
                <AuthGuard>{children}</AuthGuard>
              </AuthProvider>
            </QueryClientProvider>
          </HelmetProvider>
        </Suspense>
      </Sentry.ErrorBoundary>
    </ErrorBoundary>
  );
};
