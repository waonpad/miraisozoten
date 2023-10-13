import { useParams } from '@/router';

import { useWeapon } from '../../_/api/get-weapon';
import { UpdateWeapon } from '../../_/components/update-weapon';

export default function Page() {
  const { id } = useParams('/weapons/:id/update');

  const weaponQuery = useWeapon({ id: Number(id) });

  if (!weaponQuery.data) {
    return <div>Not Found</div>;
  }

  return (
    <div className="m-4">
      <h1 className="text-lg font-bold">武器更新</h1>
      <UpdateWeapon weapon={weaponQuery.data} />
    </div>
  );
}
