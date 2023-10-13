import { useState } from 'react';

import { useCreateWeapon } from '../api/create-weapon';

import type { CreateWeaponDTO } from '../api/create-weapon';

export const CreateWeapon = () => {
  const createWeaponMutaion = useCreateWeapon();

  const weaponFormDefault: CreateWeaponDTO['data'] = {
    name: 'test-weapon',
    attackPower: 0,
    attribute: 'sword',
  };

  const [weapon, setWeapon] = useState<CreateWeaponDTO['data']>(weaponFormDefault);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    const res = await createWeaponMutaion.mutateAsync({
      data: weapon,
    });

    console.log(res);

    setWeapon(weaponFormDefault);
  };

  return (
    <form onSubmit={handleSubmit} className="mt-8 flex flex-col space-y-4">
      <div>
        <label htmlFor="name">name:</label>
        <input
          value={weapon.name}
          onChange={(e) => setWeapon({ ...weapon, name: e.target.value })}
          className="border"
          required
        />
      </div>
      <div>
        <label htmlFor="attackPower">attackPower:</label>
        <input
          value={weapon.attackPower}
          onChange={(e) => setWeapon({ ...weapon, attackPower: Number(e.target.value) })}
          className="border"
          required
          type="number"
        />
      </div>
      <div>
        <label htmlFor="attribute">attribute:</label>
        <input
          value={weapon.attribute}
          onChange={(e) => setWeapon({ ...weapon, attribute: e.target.value })}
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
