import { DefaultBodyType, MockedRequest, RestHandler } from 'msw';

import { authHandlers } from './auth.handler';

export const handlers: RestHandler<MockedRequest<DefaultBodyType>>[] = [...authHandlers];
