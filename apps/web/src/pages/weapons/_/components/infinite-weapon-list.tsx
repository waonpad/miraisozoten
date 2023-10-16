import { useRef } from 'react';

import { Button } from 'ui/components/ui/button';

import { formatInfiniteData } from '@/utils/format';
import { useIntersectionObserver } from '@/utils/hooks/use-intersection-observer';

import { useWeaponsWithPages } from '../api/get-weapons-with-pages';

import { WeaponListItem } from './weapon-list-item';

export const WeaponList = () => {
  const infiniteweaponsQuery = useWeaponsWithPages();

  const weapons = formatInfiniteData(infiniteweaponsQuery.data);

  const loadMoreRef = useRef<HTMLButtonElement>(null);

  useIntersectionObserver({
    target: loadMoreRef,
    onIntersect: () => infiniteweaponsQuery.fetchNextPage(),
    enabled: infiniteweaponsQuery.hasNextPage,
  });

  return (
    <>
      <ul>
        {weapons.map((weapon, index) => (
          <li key={index}>
            <WeaponListItem weapon={weapon} />
          </li>
        ))}
      </ul>
      <Button ref={loadMoreRef}>Load More</Button>
    </>
  );
};
