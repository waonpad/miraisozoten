import { CreateWeaponInput, CreateWeaponInputSchema } from 'schema/dist/weapon';
import AutoForm, { AutoFormSubmit } from 'ui/components/ui/auto-form';
import { z } from 'zod';

import { useCreateWeapon } from '../api/create-weapon';

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
const schema = CreateWeaponInputSchema.merge(
  z.object({
    // ...
  })
);

export const CreateWeapon = () => {
  const createWeaponMutaion = useCreateWeapon();

  const handleSubmit = async (data: { [x: string]: unknown }) => {
    await createWeaponMutaion.mutateAsync({
      data: data as CreateWeaponInput,
    });
  };

  return (
    <AutoForm formSchema={schema} onSubmit={handleSubmit}>
      <AutoFormSubmit>Create</AutoFormSubmit>
    </AutoForm>
  );
};
