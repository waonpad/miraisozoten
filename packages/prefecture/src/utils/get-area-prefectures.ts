import { Prefectures } from '../prefectures';
import { Area, Prefecture } from '../types';

export const getAreaPrefectures = (areaId: Area['id']): Prefecture[] => {
  return Object.values(Prefectures).filter((pref) => pref.area.id === areaId);
};
