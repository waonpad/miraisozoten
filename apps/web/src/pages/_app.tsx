// import { Modals } from '@generouted/react-router';
import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { GoogleOAuthProvider } from '@react-oauth/google';
import { QueryClientProvider } from '@tanstack/react-query';
import { CookiesProvider } from 'react-cookie';
import { ErrorBoundary } from 'react-error-boundary';
import { HelmetProvider } from 'react-helmet-async';

import { AuthGuard } from '@/auth/auth-guard';
import { AuthProvider } from '@/auth/auth-provider';
import { ErrorFallback } from '@/components/elements/error-fallback';
import { SuspenseFallback } from '@/components/elements/suspense-fallback';
import { MainLayout } from '@/components/layout/main';
import { env } from '@/constants/env';
import { queryClient } from '@/lib/react-query';
import { ToastProvider } from '@/lib/react-toastify';
import { Link, useModals, useNavigate } from '@/router';

// import { Link, useModals, useNavigate, useParams } from '../router';
import { Modals } from '../routes';

export default function App() {
  const navigate = useNavigate();
  const modals = useModals();
  // const { id, pid } = useParams('/posts/:id/:pid?');

  // const a = () => navigate('/posts/:id', { params: { id: 'a' } });
  // const b = () => navigate('/posts/:id', { params: { id: '' } });
  // const c = () => navigate(-1);
  // const d = () => navigate('/posts/:id/deep', { params: { id: 'd' } });
  const e = () => navigate('/posts/:id/deep', { params: { id: 'e' } });

  return (
    <CookiesProvider>
      <Suspense fallback={<SuspenseFallback />}>
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <HelmetProvider>
            <QueryClientProvider client={queryClient}>
              <AuthProvider>
                <GoogleOAuthProvider clientId={env.VITE_GOOGLE_CLIENT_ID}>
                  <ToastProvider />
                  <AuthGuard>
                    <MainLayout>
                      <section style={{ margin: 24 }}>
                        <header style={{ display: 'flex', gap: 24 }}>
                          <Link to="/">Home</Link>
                          <Link to={{ pathname: '/about' }}>About</Link>
                          <Link to="/weapons">Weapons</Link>
                          <Link to="/posts">Posts</Link>
                          <Link to="/posts/:id/:pid?" params={{ id: '1', pid: '2' }}>
                            Posts by id/pid
                          </Link>
                          <Link to="/posts/:id" params={{ id: 'id' }}>
                            Posts by id
                          </Link>
                          <Link to="/login">Login</Link>
                          <Link to="/logout">Logout</Link>
                          <button onClick={() => modals.open('/modal')}>
                            Global modal at current route
                          </button>
                          <button onClick={() => modals.open('/modal', { at: '/about' })}>
                            Global modal at /about
                          </button>
                          <button onClick={e}>navigate to</button>
                        </header>
                        <main>
                          <Outlet />
                        </main>
                      </section>
                    </MainLayout>
                    <Modals />
                  </AuthGuard>
                </GoogleOAuthProvider>
              </AuthProvider>
            </QueryClientProvider>
          </HelmetProvider>
        </ErrorBoundary>
      </Suspense>
    </CookiesProvider>
  );
}
