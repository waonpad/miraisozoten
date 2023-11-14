import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

import type { Prisma, User } from 'database';

export const UserShema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().nullable(),
  emailVerified: z.boolean(),
  image: z.string().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const CreateUserInputSchema = UserShema.omit({
  id: true,
}) satisfies z.ZodType<Prisma.UserCreateInput>;

export const UserResponseSchema: z.ZodType<User> = UserShema;

export type CreateUserInput = z.infer<typeof CreateUserInputSchema>;

export type UserResponse = z.infer<typeof UserResponseSchema>;

export class CreateUserInputDto extends createZodDto(CreateUserInputSchema) {}
