import { RestRequest } from 'msw';
import { JwtDecodedUser } from 'schema/dist/user';

import { env } from '@/constants/env';

export const userMiddleware = async (req: RestRequest): Promise<RestRequest> => {
  const token = req.headers.get('Authorization')?.split(' ')[1];

  if (!token) {
    return req;
  }

  // CI環境の場合、うまくエミュレーターが使えないので、ここでユーザー情報を作って返してしまう
  if (env.VITE_APP_ENV === 'ci') {
    const user: JwtDecodedUser = {
      aud: env.VITE_FIREBASE_PROJECT_ID,
      auth_time: 1631030400,
      email: 'ci-test@example.com',
      email_verified: false,
      exp: 1631034000,
      firebase: {
        identities: {},
        sign_in_provider: 'anonymous',
      },
      iat: 1631030400,
      iss: `https://securetoken.google.com/${env.VITE_FIREBASE_PROJECT_ID}`,
      phone_number: undefined,
      picture: undefined,
      sub: 'ci-test',
      uid: 'ci-test',
      userRecord: {
        uid: 'ci-test',
        email: 'ci-test@example.com',
        emailVerified: false,
        displayName: 'CI Test',
        photoURL: undefined,
        phoneNumber: undefined,
        disabled: false,
        metadata: {
          creationTime: '2021-09-07T00:00:00.000Z',
          lastSignInTime: '2021-09-07T00:00:00.000Z',
          toJSON: () => ({}),
        },
        providerData: [],
        toJSON: () => ({}),
      },
    };

    req.user = user;

    return req;
  }

  try {
    // fb-toolsパッケージのlib/admin-server.jsでサーバーを立ててトークンの検証を行っている
    const decodedResponse = await fetch('http://localhost:3010/firebase/admin/verify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token }),
    });

    if (!decodedResponse.ok) {
      console.error('Failed to decode token', await decodedResponse.text());

      return req;
    }

    const decoded: JwtDecodedUser = await decodedResponse.json();

    req.user = decoded;

    return req;
  } catch (error) {
    console.error('Failed to parse decoded token', error);

    return req;
  }
};
