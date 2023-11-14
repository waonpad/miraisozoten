import { Game, User, Prefecture, Region, GameLog } from 'database';

import { db } from '../db';

export const gameRelationInclude = (
  game: Game
): Game & {
  user: User;
  prefecture: Prefecture & { region: Region };
  logs: (GameLog & { opponent: Prefecture & { region: Region } })[];
} => {
  const prefecture = db.prefecture.findFirst({
    where: { id: { equals: game.prefectureId } },
  });

  const prefectureRegion = db.region.findFirst({
    where: { id: { equals: prefecture!.regionId } },
  });

  const user = db.user.findFirst({
    where: { id: { equals: game.userId } },
  });

  const logs = db.gameLog.findMany({
    where: { gameId: { equals: game.id } },
  });

  const includedLogs = logs.map((log) => {
    const opponent = db.prefecture.findFirst({
      where: { id: { equals: log.opponentId } },
    });

    const opponentRegion = db.region.findFirst({
      where: { id: { equals: opponent!.regionId } },
    });

    return {
      ...log,
      opponent: {
        ...opponent,
        region: opponentRegion,
      },
    };
  });

  return {
    ...game,
    prefecture: {
      ...prefecture,
      region: prefectureRegion,
    },
    user,
    logs: includedLogs,
  } as unknown as Game & {
    user: User;
    prefecture: Prefecture & { region: Region };
    logs: (GameLog & { opponent: Prefecture & { region: Region } })[];
  };
};
