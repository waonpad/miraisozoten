import { extendZodWithOpenApi } from '@anatine/zod-openapi';
import { type Prisma, type Weapon } from 'database';
import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';
import { SchemaObject } from 'openapi3-ts/oas31';
import { z as zod } from 'zod';

extendZodWithOpenApi(z as typeof zod);

const WeaponShema = z
  .object({
    id: z.coerce.number().openapi({
      description: 'The id of the weapon',
      example: 1,
      nullable: false,
    } as SchemaObject),
    name: z.string().openapi({ description: 'The name of the weapon', example: 'Sword' }),
    attackPower: z.coerce.number().openapi({
      description: 'The attack power of the weapon',
      example: 10,
      nullable: false,
    } as SchemaObject),
    attribute: z
      .enum(['SWORD', 'BOW'])
      .openapi({ description: 'The attribute of the weapon', example: 'SWORD' }),
  })
  .openapi({ title: 'WeaponSchma', description: 'The weapon schema' });

export const CreateWeaponInputSchema = WeaponShema.omit({
  id: true,
}) satisfies z.ZodType<Prisma.WeaponCreateInput>;

export const UpdateWeaponInputSchema = WeaponShema.omit({
  id: true,
}) satisfies z.ZodType<Prisma.WeaponUpdateInput>;

export const WeaponResponseSchema = WeaponShema satisfies z.ZodType<Weapon>;

export type CreateWeaponInput = z.infer<typeof CreateWeaponInputSchema>;

export type UpdateWeaponInput = z.infer<typeof UpdateWeaponInputSchema>;

export type WeaponResponse = z.infer<typeof WeaponResponseSchema>;

export class CreateWeaponInputDto extends createZodDto(CreateWeaponInputSchema) {}

export class UpdateWeaponInputDto extends createZodDto(UpdateWeaponInputSchema) {}
