import { env } from '@/constants/env';

export const initMocks = async () => {
  if (env.VITE_API_MOCKING) {
    if (typeof window === 'undefined') {
      const { server } = await import('./server');
      server.listen();
    } else {
      const { worker } = await import('./browser');
      worker.start({
        // NOTE: 未定義のリクエストは実際のAPIに送信する
        onUnhandledRequest: 'bypass',
      });
    }
  }
};
