import { CreateWeaponInput, CreateWeaponInputSchema } from 'schema/dist/weapon';
import AutoForm, { AutoFormSubmit } from 'ui/components/ui/auto-form';
import { z } from 'zod';

import { useCreateWeapon } from '../api/create-weapon';

export const CreateWeapon = () => {
  const createWeaponMutaion = useCreateWeapon();

  const schema = CreateWeaponInputSchema.merge(
    z.object({
      // ...
    })
  );

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
