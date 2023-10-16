import { CreateWeapon } from './_/components/create-weapon';
import { WeaponList } from './_/components/weapon-list';

export default function Page() {
  return (
    <>
      <WeaponList />
      <CreateWeapon />
    </>
  );
}
