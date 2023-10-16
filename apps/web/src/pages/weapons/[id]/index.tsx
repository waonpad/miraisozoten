import { Link, useParams } from '@/router';

import { useWeapon } from '../_/api/get-weapon';
import { DeleteWeapon } from '../_/components/delete-weapon';

export default function Page() {
  const { id } = useParams('/weapons/:id');

  const weaponQuery = useWeapon({ id: Number(id) });

  const weapon = weaponQuery.data;

  if (!weapon) {
    return <div>Not Found</div>;
  }

  return (
    <>
      <div>{JSON.stringify(weapon)}</div>
      <DeleteWeapon id={weapon.id} />
      <Link to={`/weapons/:id/update`} params={{ id: String(weapon.id) }}>
        Update
      </Link>
    </>
  );
}
