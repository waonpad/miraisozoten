import { RestRequest, createResponseComposition, context, ResponseFunction } from 'msw';
import { JwtDecodedUser } from 'schema/dist/user';

const isTesting = process.env.NODE_ENV === 'test';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const delayedResponse: ResponseFunction<any> = createResponseComposition(undefined, [
  context.delay(isTesting ? 0 : 1000),
]);

export const userMiddleware = async (req: RestRequest): Promise<RestRequest> => {
  const token = req.headers.get('Authorization')?.split(' ')[1];

  if (!token) {
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

    const decoded: JwtDecodedUser = await decodedResponse.json();

    req.user = decoded;

    return req;
  } catch (error) {
    return req;
  }
};

export const authGuard = (request: RestRequest): RestRequest | Error => {
  if (!request.user) {
    const error = new Error('Unauthorized');
    return error;
  }

  return request;
};
