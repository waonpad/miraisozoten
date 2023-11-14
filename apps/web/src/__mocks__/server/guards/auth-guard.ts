import { RestRequest } from 'msw';

export const authGuard = (request: RestRequest): RestRequest | Error => {
  if (!request.user) {
    const error = new Error('Unauthorized');
    return error;
  }

  return request;
};
