import { useWeapons } from '../api/get-weapons';

import { WeaponListItem } from './weapon-list-item';

export const WeaponList = () => {
  const weaponsQuery = useWeapons();

  return (
    <>
      <ul>
        {(weaponsQuery.data || []).map((weapon, index) => (
          <li key={index}>
            <WeaponListItem weapon={weapon} />
          </li>
        ))}
      </ul>
    </>
  );
};
