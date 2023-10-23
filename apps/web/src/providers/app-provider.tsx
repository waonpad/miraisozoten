import { Suspense } from 'react';

import { GoogleOAuthProvider } from '@react-oauth/google';
import { QueryClientProvider } from '@tanstack/react-query';
import { CookiesProvider } from 'react-cookie';
import { HelmetProvider } from 'react-helmet-async';

import { AuthGuard } from '@/auth/auth-guard';
import { AuthProvider } from '@/auth/auth-provider';
import { ErrorFallback } from '@/components/elements/error-fallback';
import { SuspenseFallback } from '@/components/elements/suspense-fallback';
import { env } from '@/constants/env';
import { queryClient } from '@/lib/react-query';
import * as Sentry from '@/lib/sentry';

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <CookiesProvider>
      <Suspense fallback={<SuspenseFallback />}>
        <Sentry.ErrorBoundary fallback={ErrorFallback}>
          <HelmetProvider>
            <QueryClientProvider client={queryClient}>
              <AuthProvider>
                <GoogleOAuthProvider clientId={env.VITE_GOOGLE_CLIENT_ID}>
                  <AuthGuard>{children}</AuthGuard>
                </GoogleOAuthProvider>
              </AuthProvider>
            </QueryClientProvider>
          </HelmetProvider>
        </Sentry.ErrorBoundary>
      </Suspense>
    </CookiesProvider>
  );
};
