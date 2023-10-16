import { CreateWeaponInput, CreateWeaponInputSchema } from 'schema/dist/weapon';
import AutoForm, { AutoFormSubmit } from 'ui/components/ui/auto-form';
import { z } from 'zod';

import { useUpdateWeapon } from '../api/update-weapon';

import type { Weapon } from 'database';

export const UpdateWeapon = ({ weapon }: { weapon: Weapon }) => {
  const updateWeaponMutaion = useUpdateWeapon();

  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  const schema = CreateWeaponInputSchema.merge(
    z.object({
      // ここでカスタムできる
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      name: CreateWeaponInputSchema.shape.name.default(weapon.name),
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      attackPower: CreateWeaponInputSchema.shape.attackPower.default(weapon.attackPower),
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      attribute: CreateWeaponInputSchema.shape.attribute.default(weapon.attribute),
    })
  );

  const handleSubmit = async (data: { [x: string]: unknown }) => {
    const res = await updateWeaponMutaion.mutateAsync({
      id: weapon.id,
      data: data as CreateWeaponInput,
    });

    console.log(res);
  };

  return (
    <AutoForm formSchema={schema} onSubmit={handleSubmit}>
      <AutoFormSubmit>更新</AutoFormSubmit>
    </AutoForm>
  );
};
