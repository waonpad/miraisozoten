import { Weapon } from 'database';

import { useDeleteWeapon } from '../api/delete-weapon';

export const DeleteWeapon = ({ id }: { id: Weapon['id'] }) => {
  const deleteWeaponMutation = useDeleteWeapon();

  const handleDelete = async () => {
    const res = await deleteWeaponMutation.mutateAsync({
      id,
    });

    console.log(res);
  };

  return (
    <button onClick={handleDelete} className="rounded-lg bg-red-500 px-2 py-1 text-white">
      Delete
    </button>
  );
};
