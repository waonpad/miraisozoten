import jwtDecode from 'jwt-decode';
import { RestRequest, createResponseComposition, context, ResponseFunction } from 'msw';
import { JwtDecodedUser } from 'schema/dist/user';

const isTesting = process.env.NODE_ENV === 'test';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const delayedResponse: ResponseFunction<any> = createResponseComposition(undefined, [
  context.delay(isTesting ? 0 : 1000),
]);

export const userMiddleware = (req: RestRequest): RestRequest => {
  const token = req.headers.get('Authorization')?.split(' ')[1];

  if (!token) {
    return req;
  }

  try {
    const decoded = jwtDecode<JwtDecodedUser>(token);

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
