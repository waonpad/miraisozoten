import { Game, Prefecture, Region, GameLog } from 'database';

import { Prefectures as PrefecturesSeedData } from '../../../../../../packages/database/seed-data/prefectures';
import { db } from '../db';

export const computeGameData = <
  T extends Game & {
    prefecture: Prefecture & { region: Region };
    logs: (GameLog & { opponent: Prefecture & { region: Region } })[];
  },
>({
  game,
}: {
  game: T;
}): T & {
  hideData: boolean;
  conquereds: Prefecture[];
  neighbors: Prefecture[];
} => {
  const hideData = ['HARD', 'VERY_HARD'].includes(game.difficulty);

  // 勝利したログの相手のみを抽出
  const conquereds =
    game.logs.filter((log) => log.result === 'WIN').map((log) => log.opponent) || [];

  const neighbors = game.prefecture.id
    ? // 隣席県をfaltMapで取得しているので、重複を除外する
      filterUniqueItemsById(
        (() => {
          const prefectures = db.prefecture.findMany({
            // ゲームで選択された県と征服済みの県の隣接県を取得
            where: {
              id: {
                in: [game?.prefecture.id, ...conquereds.map((p) => p.id)],
              },
            },
          });

          const includedPrefectures = prefectures.map((prefecture) => {
            const neighbors = db.prefecture.findMany({
              where: {
                id: {
                  in: PrefecturesSeedData[prefecture.id as keyof typeof PrefecturesSeedData]
                    .neighbors as unknown as number[],
                },
              },
            });

            return {
              ...prefecture,
              neighbors,
            };
          });

          return includedPrefectures;
        })()
          // 隣接県のみの配列に変換
          .flatMap((p) => p.neighbors)
          // ゲームで選択された県と征服済みの県を除外
          .filter((p) => ![game.prefecture.id, ...conquereds.map((p) => p.id)].includes(p.id))
          // 地方モードであれば、地方IDが一致する県のみを抽出
          .filter((p) =>
            game.mode === 'REGIONAL' ? p.regionId === game.prefecture.region.id : true
          )
      )
    : [];

  return {
    ...game,
    hideData,
    conquereds,
    neighbors,
  };
};

const filterUniqueItemsById = <T extends { id: string | number }>(array: T[]): T[] => {
  // idを集約した配列を作成
  const itemIds = array.map(function (item) {
    return item.id;
  });
  //
  return array.filter(function (item, index) {
    return itemIds.indexOf(item.id) === index;
  });
};
