import { BrowserRouter } from 'react-router-dom';

import { AppProvider } from '@/providers/app-provider';

export const TestRenderProvider = ({ children }: { children: React.ReactNode }) => (
  // BrowserRouterで囲まないとルーティング関連のhookが使えない
  // テスト環境ではgeneroutedが動作していないため
  <BrowserRouter>
    <AppProvider>{children}</AppProvider>
  </BrowserRouter>
);
