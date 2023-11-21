import { Game, GameLog, Prefecture, Region } from 'database';
import { PrismaService } from 'src/prisma/prisma.service';

export const computeGameData = async <
  T extends Game & {
    prefecture: Prefecture & { region: Region };
    logs: (GameLog & { opponent: Prefecture & { region: Region } })[];
  },
>({
  game,
  prisma,
}: {
  game: T;
  prisma: PrismaService;
}): Promise<
  T & {
    conquereds: Prefecture[];
    neighbors: Prefecture[];
  }
> => {
  // 勝利したログの相手のみを抽出
  const conquereds =
    game.logs.filter((log) => log.result === 'WIN').map((log) => log.opponent) || [];

  const neighbors = game.prefecture.id
    ? // 隣席県をfaltMapで取得しているので、重複を除外する
      filterUniqueItemsById(
        (
          await prisma.prefecture.findMany({
            // ゲームで選択された県と征服済みの県の隣接県を取得
            where: {
              id: {
                in: [game?.prefecture.id, ...conquereds.map((p) => p.id)],
              },
            },
            include: {
              neighbors: true,
            },
          })
        )
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
