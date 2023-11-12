/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { FunctionComponent } from 'react';

import { render as rtlRender, screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { User } from 'database';
import jwtDecode from 'jwt-decode';
import { JwtDecodedUser } from 'schema/dist/user';

import { userGenerator } from '@/__mocks__/server/data-generators';
import { db } from '@/__mocks__/server/db';
import { COOKIE_NAMES } from '@/constants/cookie-names';
import { env } from '@/constants/env';
import { AppProvider } from '@/providers/app-provider';
import { setCookie } from '@/utils/cookie/set-cookie';

export const createUser = (userProperties?: Partial<User>) => {
  const user = userGenerator(userProperties);
  db.user.create({
    ...user,
    createdAt: user.createdAt.toString(),
    updatedAt: user.updatedAt.toString(),
  });
  return user;
};

export const createOAuthUser = () => {
  const decodedUser = jwtDecode<JwtDecodedUser>(env.VITE_VALID_TOKEN);

  const user = {
    id: decodedUser.sub,
    name: decodedUser.name,
    email: decodedUser.email,
    emailVerified: decodedUser.email_verified,
    image: decodedUser.picture,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  db.user.create({
    ...user,
    createdAt: user.createdAt.toString(),
    updatedAt: user.updatedAt.toString(),
  });

  return user;
};

export const loginAsUser = (user: User) => {
  setCookie(COOKIE_NAMES.AUTH_TOKEN, env.VITE_VALID_TOKEN);
  return user;
};

export const waitForLoadingToFinish = () =>
  waitForElementToBeRemoved(
    () => [...screen.queryAllByTestId(/loading/i), ...screen.queryAllByText(/loading/i)],
    { timeout: 4000 }
  );

const initializeUser = (user?: User | null) => {
  if (typeof user === 'undefined') {
    return loginAsUser(createOAuthUser());
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
  user = initializeUser(user);

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
