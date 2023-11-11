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
  id: z.string().uuid(),
  state: z.enum(GameState),
  difficulty: z.enum(GameDifficulty),
  mode: z.enum(GameMode),
  prefectureId: z.number(),
  userId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const GetGamesQuerySchema = z
  .object({
    state: GameShema.shape.state.optional(),
    difficulty: GameShema.shape.difficulty.optional(),
    mode: GameShema.shape.mode.optional(),
    userId: z.string().optional(),
  })
  .merge(PageNumberPaginationOptionsSchema);

export const CreateGameInputSchema = GameShema.pick({
  difficulty: true,
  mode: true,
  prefectureId: true,
});

export const UpdateGameInputSchema = GameShema.pick({
  state: true,
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
    hideData: z.boolean(),
    conquereds: z.array(PrefectureShema),
    neighbors: z.array(PrefectureShema),
    // Factorの吸収は？
  })
) satisfies z.ZodType<Game & { prefecture: Prefecture; user: User; logs: GameLog[] }>;

export type GetGamesQuery = z.infer<typeof GetGamesQuerySchema>;

export type CreateGameInput = z.infer<typeof CreateGameInputSchema>;

export type UpdateGameInput = z.infer<typeof UpdateGameInputSchema>;

export type GameResponse = z.infer<typeof GameResponseSchema>;

export class GetGamesQueryDto extends createZodDto(GetGamesQuerySchema) {}

export class CreateGameInputDto extends createZodDto(CreateGameInputSchema) {}

export class UpdateGameInputDto extends createZodDto(UpdateGameInputSchema) {}
