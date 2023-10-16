import { type Prisma, type Weapon } from 'database';
import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

const WeaponShema = z.object({
  id: z.coerce.number(),
  name: z.string(),
  attackPower: z.coerce.number(),
  attribute: z.enum(['SWORD', 'BOW']),
});

// id は autoincrement で生成されるので除外する
export const CreateWeaponInputSchema = WeaponShema.omit({
  id: true,
}) satisfies z.ZodType<Prisma.WeaponCreateInput>;

export const UpdateWeaponInputSchema = WeaponShema.omit({
  id: true,
}) satisfies z.ZodType<Prisma.WeaponCreateInput>;

export const WeaponResponseSchema = WeaponShema satisfies z.ZodType<Weapon>;

export type CreateWeaponInput = z.infer<typeof CreateWeaponInputSchema>;

export type UpdateWeaponInput = z.infer<typeof UpdateWeaponInputSchema>;

export type WeaponResponse = z.infer<typeof WeaponResponseSchema>;

export class CreateWeaponInputDto extends createZodDto(CreateWeaponInputSchema) {}

export class UpdateWeaponInputDto extends createZodDto(UpdateWeaponInputSchema) {}
