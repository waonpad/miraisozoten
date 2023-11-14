import { DefaultBodyType, MockedRequest, RestHandler } from 'msw';

import { authHandlers } from './auth.handler';
import { gameHandlers } from './game.handler';
import { prefectureStatsMetadataHandlers } from './prefecture-stats-metadata.handler';
import { prefectureHandlers } from './prefecture.handler';

export const handlers: RestHandler<MockedRequest<DefaultBodyType>>[] = [
  ...authHandlers,
  ...gameHandlers,
  ...prefectureStatsMetadataHandlers,
  ...prefectureHandlers,
];
