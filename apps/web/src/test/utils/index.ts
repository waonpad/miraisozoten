/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { FunctionComponent } from 'react';

import { render as rtlRender, screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { User } from 'database';
import { JwtDecodedUser } from 'schema/dist/user';

import { userGenerator } from '@/__mocks__/server/data-generators';
import { db } from '@/__mocks__/server/db';
import { firebaseAuth, signInWithCredential, GoogleAuthProvider } from '@/lib/firebase';
import { AppProvider } from '@/providers/app-provider';

export const createUser = (userProperties?: Partial<User>) => {
  const user = userGenerator(userProperties);
  db.user.create({
    ...user,
    createdAt: user.createdAt.toString(),
    updatedAt: user.updatedAt.toString(),
  });
  return user;
};

export const createOAuthUser = async () => {
  // 匿名ユーザー
  // const result = await signInAnonymously(firebaseAuth);

  const random = Math.random();

  // テスト用のユーザーを作成
  const result = await signInWithCredential(
    firebaseAuth,
    GoogleAuthProvider.credential(
      JSON.stringify({
        sub: `test-user-${random}`,
        email: `test-user-${random}@example.com`,
        email_verified: true,
        name: `test-user-${random}`,
      })
    )
  );

  // テスト用のユーザーのトークンを取得
  const token = await result.user.getIdToken();

  // fb-toolsパッケージのlib/admin-server.jsでサーバーを立ててトークンの検証を行っている
  const decodedResponse = await fetch('http://localhost:3010/firebase/admin/verify', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ token }),
  });

  const decoded: JwtDecodedUser = await decodedResponse.json();

  // 匿名ログインの場合
  if (decoded.provider_id === 'anonymous') {
    decoded.name = 'ゲスト';
    decoded.email = `${decoded.sub}@example.com`;
    decoded.email_verified = false;
  }

  // 匿名ログインからソーシャルアカウントにリンクした場合
  // ソーシャルアカウントのデータがマウントされないので、プロバイダーのデータから取り出してくる
  // Google以外の場合を検証していない
  // Googleログイン以外をすることを想定していないので、providerData[0]としている
  if (!decoded.name) {
    decoded.name = decoded.userRecord.providerData[0].displayName;
    decoded.picture = decoded.userRecord.providerData[0].photoURL;
  }

  const user = {
    id: decoded.sub,
    name: decoded.name,
    email: decoded.email,
    emailVerified: decoded.email_verified,
    image: decoded.picture,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  db.user.create({
    ...user,
    createdAt: user.createdAt.toString(),
    updatedAt: user.updatedAt.toString(),
  });

  return user as User;
};

export const loginAsUser = (user: User) => {
  // TODO: indexedDBに保存しないといけないが、面倒そうなので後回し
  return user;
};

export const waitForLoadingToFinish = () =>
  waitForElementToBeRemoved(
    () => [...screen.queryAllByTestId(/loading/i), ...screen.queryAllByText(/loading/i)],
    { timeout: 4000 }
  );

const initializeUser = async (user?: User | null) => {
  if (typeof user === 'undefined') {
    return loginAsUser(await createOAuthUser());
  } else if (user) {
    return loginAsUser(user);
  } else {
    return null;
  }
};

export const render: (
  ui: React.ReactElement,
  options?: {
    route?: string;
    user?: User | null;
  }
) => Promise<ReturnType<typeof rtlRender>> = async (
  ui,
  { route = '/', user, ...renderOptions } = {}
) => {
  // if you want to render the app unauthenticated then pass "null" as the user
  user = await initializeUser(user);

  window.history.pushState({}, 'Test page', route);

  const returnValue = {
    ...rtlRender(ui, {
      wrapper: AppProvider as FunctionComponent<unknown>,
      ...renderOptions,
    }),
    user,
  };

  await waitForLoadingToFinish();

  return returnValue;
};

export * from '@testing-library/react';
export { userEvent, rtlRender };
