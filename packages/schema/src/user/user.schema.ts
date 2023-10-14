import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

import type { Prisma, User } from 'database';

const UserShema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  emailVerified: z.boolean(),
  image: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

// id は autoincrement で生成されるので除外する
export const CreateUserInputSchema: z.ZodType<Prisma.UserCreateInput> = UserShema.omit({
  id: true,
});

export const UpdateUserInputSchema: z.ZodType<Prisma.UserCreateInput> = UserShema.omit({
  id: true,
});

export const UserResponseSchema: z.ZodType<User> = UserShema;

export type CreateUserInput = z.infer<typeof CreateUserInputSchema>;

export type UpdateUserInput = z.infer<typeof UpdateUserInputSchema>;

export type UserResponse = z.infer<typeof UserResponseSchema>;

export class CreateUserInputDto extends createZodDto(CreateUserInputSchema) {}

export class UpdateUserInputDto extends createZodDto(UpdateUserInputSchema) {}
