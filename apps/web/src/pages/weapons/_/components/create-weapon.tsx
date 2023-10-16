import { CreateWeaponInput, CreateWeaponInputSchema } from 'schema/dist/weapon';
import AutoForm, { AutoFormSubmit } from 'ui/components/ui/auto-form';
import { z } from 'zod';

import { useCreateWeapon } from '../api/create-weapon';

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
const schema = CreateWeaponInputSchema.merge(
  z.object({
    // ここでカスタムできる
  })
);

export const CreateWeapon = () => {
  const createWeaponMutaion = useCreateWeapon();

  const handleSubmit = async (data: { [x: string]: unknown }) => {
    const res = await createWeaponMutaion.mutateAsync({
      data: data as CreateWeaponInput,
    });

    console.log(res);
  };

  return (
    <AutoForm formSchema={schema} onSubmit={handleSubmit}>
      <AutoFormSubmit>作成</AutoFormSubmit>
    </AutoForm>
  );
};
