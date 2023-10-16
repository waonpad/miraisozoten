import { Weapon } from 'database';
import { Button } from 'ui/components/ui/button';

import { useDeleteWeapon } from '../api/delete-weapon';

export const DeleteWeapon = ({ id }: { id: Weapon['id'] }) => {
  const deleteWeaponMutation = useDeleteWeapon();

  const handleDelete = async () => {
    await deleteWeaponMutation.mutateAsync({ id });
  };

  return <Button onClick={handleDelete}>Delete</Button>;
};
