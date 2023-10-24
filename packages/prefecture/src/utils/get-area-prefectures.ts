import { Prefectures } from '../prefectures';
import { AreaId, Prefecture } from '../types';

export const getAreaPrefectures = (areaId: AreaId): Prefecture[] => {
  return Object.values(Prefectures).filter((pref) => pref.area.id === areaId);
};
