import { DefaultBodyType, MockedRequest, RestHandler } from 'msw';

import { authHandlers } from './auth.handler';
import { weaponHandlers } from './weapon.handler';

export const handlers: RestHandler<MockedRequest<DefaultBodyType>>[] = [
  ...authHandlers,
  ...weaponHandlers,
];
