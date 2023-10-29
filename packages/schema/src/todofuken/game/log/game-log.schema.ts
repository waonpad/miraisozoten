import { extendZodWithOpenApi } from '@anatine/zod-openapi';
import { type Prisma, type GameLog, Prefecture } from 'database';
import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';
// import { SchemaObject } from 'openapi3-ts/oas31';
import { z as zod } from 'zod';

import { PrefectureShema, PrefectureStatsName } from '../../../prefecture';
import { GameResult, HighLow } from '../game.enum';

extendZodWithOpenApi(z as typeof zod);

export const GameLogShema = z.object({
  id: z.number(),
  gameId: z.string().uuid(),
  highLow: z.enum(HighLow),
  factorName: z.enum(PrefectureStatsName),
  opponentId: z.number(),
  result: z.enum(GameResult),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const CreateGameLogInputSchema = GameLogShema.pick({
  highLow: true,
  factorName: true,
  opponentId: true,
}) satisfies z.ZodType<Omit<Prisma.GameLogCreateInput, 'result' | 'game' | 'opponent'>>;

export const GameLogResponseSchema = GameLogShema.merge(
  z.object({
    opponent: PrefectureShema,
  })
) satisfies z.ZodType<GameLog & { opponent: Prefecture }>;

export type CreateGameLogInput = z.infer<typeof CreateGameLogInputSchema>;

export type GameLogResponse = z.infer<typeof GameLogResponseSchema>;

export class CreateGameLogInputDto extends createZodDto(CreateGameLogInputSchema) {}
