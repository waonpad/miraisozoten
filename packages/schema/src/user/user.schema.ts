import { extendZodWithOpenApi } from '@anatine/zod-openapi';
import { z } from 'nestjs-zod/z';
import { z as zod } from 'zod';

import type { User } from 'database';

extendZodWithOpenApi(z as typeof zod);

export const UserShema = z.object({
  id: z.string().openapi({ example: '00000000-0000-0000-0000-000000000000' }),
  name: z.string().openapi({ example: 'ゲスト' }),
  email: z.string().nullable().openapi({ example: 'example@example.com' }),
  emailVerified: z.boolean().openapi({ example: false }),
  image: z.string().nullable().openapi({ example: null }),
  createdAt: z.date().openapi({ example: '2021-01-01T00:00:00.000Z' }),
  updatedAt: z.date().openapi({ example: '2021-01-01T00:00:00.000Z' }),
});

export const UserResponseSchema: z.ZodType<User> = UserShema;

export type UserResponse = z.infer<typeof UserResponseSchema>;
