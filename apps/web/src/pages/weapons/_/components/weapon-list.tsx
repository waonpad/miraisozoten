import { useRef } from 'react';

import { Link } from '@/router';
import { formatInfiniteData } from '@/utils/format';
import { useIntersectionObserver } from '@/utils/hooks/use-intersection-observer';

import { useWeapons } from '../api/get-weapons';

export const WeaponList = () => {
  const weaponsQuery = useWeapons();

  const weapons = formatInfiniteData(weaponsQuery.data);

  const loadMoreRef = useRef<HTMLButtonElement>(null);

  useIntersectionObserver({
    target: loadMoreRef,
    onIntersect: () => weaponsQuery.fetchNextPage(),
    enabled: weaponsQuery.hasNextPage,
  });

  return (
    <>
      <ul className="flex flex-col space-y-4">
        {weapons.map((weapon, index) => (
          <li key={index}>
            <div className="my-10 border-2 border-black">
              <Link to={`/weapons/:id`} params={{ id: String(weapon.id) }}>
                {weapon.name}
              </Link>
            </div>
          </li>
        ))}
      </ul>
      <button ref={loadMoreRef} className="rounded-lg bg-blue-500 px-2 py-1 text-white">
        Load More
      </button>
    </>
  );
};
