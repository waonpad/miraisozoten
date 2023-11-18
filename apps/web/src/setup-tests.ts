import '@testing-library/jest-dom';

import { resetDb } from '@/__mocks__/server/db';
import { server } from '@/__mocks__/server/server';
import { queryClient } from '@/lib/react-query';

import { env } from './constants/env';

// 共通モック処理
import '@/test/utils/mocks';

// テストごとにサーバーをリセット
beforeAll(() => server.listen({ onUnhandledRequest: 'bypass' }));
afterAll(() => server.close());
afterEach(() => server.resetHandlers());

afterEach(async () => {
  queryClient.clear();
  resetDb();

  // テストごとにFIrebase Emulatorのユーザーを削除
  await fetch(
    `http://${env.VITE_FIREBASE_AUTH_EMULATOR_HOST}/emulator/v1/projects/${env.VITE_FIREBASE_PROJECT_ID}/accounts`,
    { method: 'DELETE' }
  );
});
