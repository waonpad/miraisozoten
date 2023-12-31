import { ForbiddenException, Inject, Injectable } from '@nestjs/common';
import { Game } from 'database';

import { PageNumberPaginationMeta } from 'schema/dist/common/pagination';
import { PrefectureStatsConfig } from 'schema/dist/prefecture/stats';
import {
  CreateGameInputDto,
  GameResponse,
  GameResult,
  GetGamesQueryDto,
} from 'schema/dist/todoufuken/game';
import { CreateGameLogInputDto, GameLogResponse } from 'schema/dist/todoufuken/game/log';
import { JwtDecodedUser } from 'schema/dist/user';
import { InjectionToken } from 'src/config/environments/constants/injection-token.enum';
import { PrismaService } from 'src/prisma/prisma.service';
import { computeGameData } from 'src/util/compute-game-data.util';
import { gameDefaultInclude } from './config/game-include-default';

@Injectable()
export class GameService {
  constructor(@Inject(InjectionToken.PRISMA_SERVICE) private readonly prisma: PrismaService) {}

  async getAllGame(
    query: GetGamesQueryDto,
    user: JwtDecodedUser
  ): Promise<[GameResponse[], PageNumberPaginationMeta]> {
    if (query.userId && query.userId !== user.sub) {
      // ユーザーIDが指定されているが、自分のIDと一致しない場合はエラー
      // ただし、ランキングでは他のユーザーのゲームも見れる
      throw new ForbiddenException('You can only get your own games');
    }

    const { page, limit, regionId, orderBy, ...rest } = query;

    const games = await this.prisma
      .pg()
      .game.paginate({
        where: { prefecture: { regionId }, ...rest },
        include: gameDefaultInclude,
        orderBy: orderBy.map((order) => ({
          [order.column]:
            'nulls' in order
              ? {
                  sort: order.sort,
                  nulls: order.nulls,
                }
              : order.sort,
        })),
      })
      .withPages({ page, limit, includePageCount: true });

    const computedGames = await Promise.all(
      games[0].map((game) => computeGameData({ game, prisma: this.prisma }))
    );

    // orderByにclearTimeが含まれている場合は順位を計算する
    const rankedGames = orderBy.some((order) => order.column === 'clearTime')
      ? computedGames.map((game) => {
          const take = (page - 1) * limit;
          const rank = games[0].findIndex((g) => g.id === game.id) + 1 + take;

          return {
            ...game,
            rank,
          };
        })
      : computedGames;

    // NOTICE: なぜか型の補完が行われないが、正常にprismaの拡張によって計算されているため
    // 型アサーションしている
    return [rankedGames as GameResponse[], games[1]];
  }

  async getGame(id: Game['id'], user: JwtDecodedUser): Promise<GameResponse | null> {
    const game = await this.prisma.game.findUnique({
      where: { id, userId: user.sub },
      include: gameDefaultInclude,
    });

    if (!game) return null;

    return computeGameData({ game, prisma: this.prisma });
  }

  async createGame(data: CreateGameInputDto, user: JwtDecodedUser): Promise<GameResponse> {
    const game = await this.prisma.game.create({
      data: {
        state: 'PLAYING',
        difficulty: data.difficulty,
        mode: data.mode,
        prefecture: {
          connect: { id: data.prefectureId },
        },
        user: {
          connect: { id: user.sub },
        },
      },
      include: gameDefaultInclude,
    });

    return computeGameData({ game, prisma: this.prisma });
  }

  // TODO: 複数回りクエストが送られてきても、1ターンに1回しか処理されないようにする
  // TODO: 隣接県の整合性がとれているかどうかをチェックする
  async submitGameTurnAction(
    id: Game['id'],
    data: CreateGameLogInputDto,
    user: JwtDecodedUser
  ): Promise<GameLogResponse> {
    // どの都道府県のデータを使うのか
    // ↑
    // 最初に選んだ都道府県固定
    const allyPrefectureId = data.factorPrefectureId;

    const computedGame = await computeGameData({
      game: await this.prisma.game.findUniqueOrThrow({
        where: { id, userId: user.sub },
        include: {
          ...gameDefaultInclude,
          prefecture: {
            include: {
              region: {
                include: {
                  prefectures: true,
                },
              },
            },
          },
        },
      }),
      prisma: this.prisma,
    });

    // factorNameがdata.factorNameと一致するかつ
    // resultがWINのログのopponentIdを抽出
    const conqueredBySameFactorPrefectureIds = computedGame.logs
      .filter((log) => {
        const isSameFactorName = log.factorName === data.factorName;
        const isWin = log.result === 'WIN';

        return isSameFactorName && isWin;
      })
      .map((log) => log.opponentId);

    const factors = await this.prisma.prefectureStats.findMany({
      where: {
        id: {
          in: [allyPrefectureId, data.opponentId, ...conqueredBySameFactorPrefectureIds],
        },
      },
      select: {
        id: true,
        [PrefectureStatsConfig[data.factorName].camel]: true,
      },
    });

    const prefectureFactor = factors.find((f) => f.id === allyPrefectureId)?.[
      PrefectureStatsConfig[data.factorName].camel
    ] as unknown as number;

    const conqueredBySameFactorPrefectureFactor = factors
      .filter((f) => {
        return conqueredBySameFactorPrefectureIds.includes(f.id);
      })
      .reduce((prev, current) => {
        return prev + current[PrefectureStatsConfig[data.factorName].camel];
      }, 0);

    // 最初に選んだ都道府県の値 + 制覇した都道府県の値
    const allyFactor = prefectureFactor + conqueredBySameFactorPrefectureFactor;

    const opponentFactor = factors.find((f) => f.id === data.opponentId)?.[
      PrefectureStatsConfig[data.factorName].camel
    ] as unknown as number;

    const result: GameResult =
      // 同じ値であれば、勝利条件に関わらずDRAW
      allyFactor === opponentFactor
        ? 'DRAW'
        : // 高ければ勝つ場合
        data.highLow === 'HIGH'
        ? allyFactor > opponentFactor
          ? 'WIN'
          : 'LOSE'
        : // 低ければ勝つ場合
        allyFactor < opponentFactor
        ? 'WIN'
        : 'LOSE';

    const now = new Date();

    // 隣接県が無いということは、全ての県を回りきったということなので、ゲームを終了する
    // が、このターンの対戦相手はまだ隣接県として残っているので、
    if (
      // 全国制覇モードで
      // 制覇した県が45(最初に選択した県は含まず、今回のターンの対戦相手はまだ反映されていない)
      ((computedGame.mode === 'NATIONWIDE' && computedGame.conquereds.length === 45) ||
        // 地方制覇モードで
        // 制覇した県が地方の県数 - 2(最初に選択した県は含まず、今回のターンの対戦相手はまだ反映されていない)
        (computedGame.mode === 'REGIONAL' &&
          computedGame.conquereds.length ===
            computedGame.prefecture.region.prefectures.length - 2)) &&
      result === 'WIN' // 勝利した場合
    ) {
      // ゲームを終了する
      await this.prisma.game.update({
        where: { id, userId: user.sub },
        data: {
          state: 'FINISHED',
          clearTime: now.getTime() - computedGame.createdAt.getTime(),
          updatedAt: now,
        },
      });
    }

    return this.prisma.gameLog.create({
      data: {
        result,
        highLow: data.highLow,
        factorPrefecture: {
          connect: { id: data.factorPrefectureId },
        },
        factorName: data.factorName,
        opponent: {
          connect: { id: data.opponentId },
        },
        game: {
          connect: { id },
        },
        // clearTimeの計算とのズレを発生させないため、明示的にcreatedAtとupdatedAtを指定する
        createdAt: now,
        updatedAt: now,
      },
      include: {
        opponent: true,
      },
    });
  }

  async giveUpGame(id: Game['id'], user: JwtDecodedUser): Promise<GameResponse> {
    const game = await this.prisma.game.update({
      where: { id, userId: user.sub },
      data: {
        state: 'GIVEN_UP',
      },
      include: gameDefaultInclude,
    });

    return computeGameData({ game, prisma: this.prisma });
  }
}
