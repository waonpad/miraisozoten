import { useState } from 'react';

import { useUpdateWeapon } from '../api/update-weapon';

import type { UpdateWeaponDTO } from '../api/update-weapon';
import type { Weapon } from 'database';

export const UpdateWeapon = ({ weapon }: { weapon: Weapon }) => {
  const updateWeaponMutation = useUpdateWeapon();

  const [weaponForm, setWeapon] = useState<UpdateWeaponDTO['data']>(weapon);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    const res = await updateWeaponMutation.mutateAsync({
      data: weaponForm,
      id: weapon.id,
    });

    console.log(res);
  };

  return (
    <form onSubmit={handleSubmit} className="mt-8 flex flex-col space-y-4">
      <div>
        <label htmlFor="name">name:</label>
        <input
          value={weaponForm.name}
          onChange={(e) => setWeapon({ ...weaponForm, name: e.target.value })}
          className="border"
          required
        />
      </div>
      <div>
        <label htmlFor="attackPower">attackPower:</label>
        <input
          value={weaponForm.attackPower}
          onChange={(e) => setWeapon({ ...weaponForm, attackPower: Number(e.target.value) })}
          className="border"
          required
          type="number"
        />
      </div>
      <div>
        <label htmlFor="attribute">attribute:</label>
        <input
          value={weaponForm.attribute}
          onChange={(e) => setWeapon({ ...weaponForm, attribute: e.target.value })}
          className="border"
          required
        />
      </div>
      <div>
        <button type="submit" className="rounded-lg bg-blue-500 px-2 py-1 text-white">
          Submit
        </button>
      </div>
    </form>
  );
};
