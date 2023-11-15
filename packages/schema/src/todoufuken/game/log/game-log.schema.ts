import { extendZodWithOpenApi } from '@anatine/zod-openapi';
import { type Prisma, type GameLog, Prefecture } from 'database';
import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';
// import { SchemaObject } from 'openapi3-ts/oas31';
import { z as zod } from 'zod';

import { PrefectureShema } from '../../../prefecture';
import { PrefectureStatsName } from '../../../prefecture/stats';
import { GameResult, HighLow } from '../game.enum';

extendZodWithOpenApi(z as typeof zod);

export const GameLogShema = z.object({
  id: z.number().openapi({ example: 1 }),
  gameId: z.string().uuid().openapi({ example: '00000000-0000-0000-0000-000000000000' }),
  highLow: z.enum(HighLow).openapi({ example: 'HIGH' }),
  factorPrefectureId: PrefectureShema.shape.id,
  factorName: z.enum(PrefectureStatsName).openapi({ example: 'POPULATION' }),
  opponentId: PrefectureShema.shape.id,
  result: z.enum(GameResult).openapi({ example: 'WIN' }),
  createdAt: z.date().openapi({ example: '2021-01-01T00:00:00.000Z' }),
  updatedAt: z.date().openapi({ example: '2021-01-01T00:00:00.000Z' }),
});

export const CreateGameLogInputSchema = GameLogShema.pick({
  highLow: true,
  factorPrefectureId: true,
  factorName: true,
  opponentId: true,
}) satisfies z.ZodType<
  Omit<Prisma.GameLogCreateInput, 'result' | 'game' | 'factorPrefecture' | 'opponent'>
>;

export const GameLogResponseSchema = GameLogShema.merge(
  z.object({
    opponent: PrefectureShema,
  })
) satisfies z.ZodType<GameLog & { opponent: Prefecture }>;

export type CreateGameLogInput = z.infer<typeof CreateGameLogInputSchema>;

export type GameLogResponse = z.infer<typeof GameLogResponseSchema>;

export class CreateGameLogInputDto extends createZodDto(CreateGameLogInputSchema) {}
