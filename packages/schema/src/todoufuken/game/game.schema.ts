import { extendZodWithOpenApi } from '@anatine/zod-openapi';
import { Prefecture, User, type Game, GameLog } from 'database';
import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';
// import { SchemaObject } from 'openapi3-ts/oas31';
import { z as zod } from 'zod';

import { PageNumberPaginationOptionsSchema } from '../../common';
import { PrefectureShema } from '../../prefecture';
import { RegionShema } from '../../prefecture/region';
import { UserShema } from '../../user';

import { GameDifficulty, GameMode, GameState } from './game.enum';
import { GameLogShema } from './log/game-log.schema';

extendZodWithOpenApi(z as typeof zod);

export const GameShema = z.object({
  id: z.string().uuid().openapi({ example: '00000000-0000-0000-0000-000000000000' }),
  state: z.enum(GameState).openapi({ example: 'PLAYING' }),
  difficulty: z.enum(GameDifficulty).openapi({ example: 'NORMAL' }),
  mode: z.enum(GameMode).openapi({ example: 'NATIONWIDE' }),
  prefectureId: z.number().openapi({ example: 1 }),
  userId: z.string().openapi({ example: '00000000-0000-0000-0000-000000000000' }),
  clearTime: z.number().nullable().openapi({ example: 1234567 }),
  createdAt: z.date().openapi({ example: '2021-01-01T00:00:00.000Z' }),
  updatedAt: z.date().openapi({ example: '2021-01-01T00:00:00.000Z' }),
});

export const GetGamesQuerySchema = z
  .object({
    state: GameShema.shape.state.optional(),
    difficulty: GameShema.shape.difficulty.optional(),
    mode: GameShema.shape.mode.optional(),
    regionId: z.coerce.number().optional(),
    userId: GameShema.shape.userId.optional(),
    orderBy: z
      .array(
        z.union([
          z.object({
            column: z.enum(['clearTime']),
            sort: z.enum(['asc', 'desc']),
            nulls: z.enum(['first', 'last']),
          }),
          z.object({
            column: z.enum(['createdAt']),
            sort: z.enum(['asc', 'desc']),
          }),
        ])
      )
      .default([{ column: 'createdAt', sort: 'desc' }]),
  })
  .merge(PageNumberPaginationOptionsSchema);

export const CreateGameInputSchema = GameShema.pick({
  difficulty: true,
  mode: true,
  prefectureId: true,
});

export const GameResponseSchema = GameShema.merge(
  z.object({
    prefecture: PrefectureShema.merge(z.object({ region: RegionShema })),
    user: UserShema,
    logs: z.array(
      GameLogShema.merge(
        z.object({ opponent: PrefectureShema.merge(z.object({ region: RegionShema })) })
      )
    ),
    // バックエンドで計算した値を返す
    hideData: z.boolean().openapi({ example: false }),
    conquereds: z.array(PrefectureShema),
    neighbors: z.array(PrefectureShema),
    rank: z.number().optional().openapi({ example: 1 }),
  })
) satisfies z.ZodType<Game & { prefecture: Prefecture; user: User; logs: GameLog[] }>;

export type GetGamesQuery = z.infer<typeof GetGamesQuerySchema>;

export type CreateGameInput = z.infer<typeof CreateGameInputSchema>;

export type GameResponse = z.infer<typeof GameResponseSchema>;

export class GetGamesQueryDto extends createZodDto(GetGamesQuerySchema) {}

export class CreateGameInputDto extends createZodDto(CreateGameInputSchema) {}
