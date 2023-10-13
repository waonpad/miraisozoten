import { useState } from 'react';

import { useCreateWeapon } from '../api/create-weapon';
import { CreateWeaponInput } from '../entity/weapon.entity';

export const CreateWeapon = () => {
  const createWeaponMutaion = useCreateWeapon();

  const errors = createWeaponMutaion.error?.response?.data?.errors;

  const weaponFormDefault: CreateWeaponInput = {
    name: 'test-weapon',
    attackPower: 0,
    attribute: 'sword',
  };

  const [weapon, setWeapon] = useState<CreateWeaponInput>(weaponFormDefault);

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
        {/* エラーを表示する */}
        {(errors ?? [])
          .filter((error) => error.path[0] === 'name')
          .map((error) => (
            <div key={error.message} className="text-red-500">
              {error.message}
            </div>
          ))}
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
        {/* エラーを表示する */}
        {(errors ?? [])
          .filter((error) => error.path[0] === 'attackPower')
          .map((error) => (
            <div key={error.message} className="text-red-500">
              {error.message}
            </div>
          ))}
      </div>
      <div>
        <label htmlFor="attribute">attribute:</label>
        <input
          value={weapon.attribute}
          onChange={(e) => setWeapon({ ...weapon, attribute: e.target.value })}
          className="border"
          required
        />
        {/* エラーを表示する */}
        {(errors ?? [])
          .filter((error) => error.path[0] === 'attribute')
          .map((error) => (
            <div key={error.message} className="text-red-500">
              {error.message}
            </div>
          ))}
      </div>
      <div>
        <button type="submit" className="rounded-lg bg-blue-500 px-2 py-1 text-white">
          Submit
        </button>
      </div>
    </form>
  );
};
