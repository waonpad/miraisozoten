import { WeaponResponse } from 'schema/dist/weapon';

import { Link } from '@/router';

export const WeaponListItem = ({ weapon }: { weapon: WeaponResponse }) => {
  return (
    <div>
      <Link to={`/weapons/:id`} params={{ id: String(weapon.id) }}>
        {JSON.stringify(weapon)}
      </Link>
    </div>
  );
};
