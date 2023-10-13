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
    <div className="m-4">
      <h1 className="text-lg font-bold">詳細</h1>
      <p>ID: {weapon.id}</p>
      <p>名前: {weapon.name}</p>
      <p>攻撃力: {weapon.attackPower}</p>
      <p>属性: {weapon.attribute}</p>
      <DeleteWeapon id={weapon.id} />
      <Link to={`/weapons/:id/update`} params={{ id: String(weapon.id) }}>
        Update
      </Link>
    </div>
  );
}
