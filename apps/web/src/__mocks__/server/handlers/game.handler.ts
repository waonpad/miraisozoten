/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Game } from 'database';
import { DefaultBodyType, MockedRequest, RestHandler, rest } from 'msw';
import qs from 'qs';
import { PrefectureStatsConfig } from 'schema/dist/prefecture/stats';
import {
  CreateGameInputSchema,
  GameResult,
  GetGamesQuerySchema,
} from 'schema/dist/todoufuken/game';
import { CreateGameLogInputSchema } from 'schema/dist/todoufuken/game/log';
import { ZodError } from 'zod';

import { env } from '@/constants/env';

import { db, persistDb } from '../db';
import { authGuard } from '../guards/auth-guard';
import { userMiddleware } from '../middleware/user-middleware';
import { computeGameData } from '../utils/compute-game-data';
import { delayedResponse } from '../utils/delayed-response';
import { gameRelationInclude } from '../utils/game-relation-include';
import { getPageNumberPaginationMeta } from '../utils/get-page-number-pagination-meta';

export const gameHandlers: RestHandler<MockedRequest<DefaultBodyType>>[] = [
  rest.get(`${env.VITE_API_URL}/games`, async (req, _res, ctx) => {
    const userReq = await userMiddleware(req);

    const paramsOrError = (() => {
      try {
        return GetGamesQuerySchema.parse(qs.parse(userReq.url.search.split('?')[1]));
      } catch (error: unknown) {
        return error as Error;
      }
    })();

    if (paramsOrError instanceof ZodError) {
      // Issueとともに422エラーを返す
      return delayedResponse(
        ctx.status(422),
        ctx.json({
          message: 'Validation Error',
          errors: paramsOrError.issues,
        })
      );
    }

    if (paramsOrError instanceof Error) {
      return delayedResponse(
        ctx.status(400),
        ctx.json({ message: paramsOrError?.message || 'Server Error' })
      );
    }

    const { state, difficulty, mode, regionId, page, limit, userId, orderBy } =
      paramsOrError as unknown as ReturnType<typeof GetGamesQuerySchema.parse>;

    if (userId && userId !== userReq.user?.sub) {
      // ユーザーIDが指定されているが、自分のIDと一致しない場合はエラー
      // ただし、ランキングでは他のユーザーのゲームも見れる
      return delayedResponse(
        ctx.status(403),
        ctx.json({ message: 'You can only get your own games' })
      );
    }

    console.log(qs.parse(userReq.url.search));

    console.log(paramsOrError);

    try {
      const games = db.game.findMany({
        where: {
          ...(state && { state: { equals: state } }),
          ...(difficulty && { difficulty: { equals: difficulty } }),
          ...(mode && { mode: { equals: mode } }),
          // ネストしたクエリができない
          // ...(regionId && { prefecture: { regionId: { equals: regionId } } }),
          ...(regionId && {
            prefectureId: {
              in: db.prefecture
                .findMany({ where: { regionId: { equals: regionId } } })
                .map((prefecture) => prefecture.id),
            },
          }),
          ...(userId && { userId: { equals: userId } }),
        },
        take: limit,
        skip: (page - 1) * limit,
        orderBy: [
          ...orderBy.map((order) => ({
            // nullsに対応していない
            [order.column]: order.sort,
          })),
        ] as any,
      });

      const includedGames = games.map((game) => gameRelationInclude(game as unknown as Game));

      const computedGames = includedGames.map((game) => computeGameData({ game }));

      // orderByにclearTimeが含まれている場合は順位を計算する
      const rankedGames = orderBy.some((order) => order.column === 'clearTime')
        ? computedGames.map((game) => {
            const take = (page - 1) * limit;
            const rank = games.findIndex((g) => g.id === game.id) + 1 + take;

            return {
              ...game,
              rank,
            };
          })
        : computedGames;

      const allGames = db.game.findMany({});

      const pageMeta = getPageNumberPaginationMeta({
        page,
        limit,
        total: allGames.length,
      });

      return delayedResponse(ctx.json([rankedGames, pageMeta]));
    } catch (error: any) {
      return delayedResponse(
        ctx.status(400),
        ctx.json({ message: error?.message || 'Server Error' })
      );
    }
  }),
  rest.get(`${env.VITE_API_URL}/games/:id`, async (req, _res, ctx) => {
    const userReq = await userMiddleware(req);
    const authenticatedReq = authGuard(userReq);

    if (authenticatedReq instanceof Error) {
      return delayedResponse(ctx.status(401), ctx.json({ message: authenticatedReq.message }));
    }

    try {
      const game = db.game.findFirst({
        where: {
          id: {
            equals: req.params.id as string,
          },
        },
      });

      // なければnullを返す
      if (!game) return delayedResponse(ctx.json(null));

      const includedGame = gameRelationInclude(game as unknown as Game);

      const computedGame = computeGameData({ game: includedGame });

      return delayedResponse(ctx.json(computedGame));
    } catch (error: any) {
      return delayedResponse(
        ctx.status(400),
        ctx.json({ message: error?.message || 'Server Error' })
      );
    }
  }),
  rest.post(`${env.VITE_API_URL}/games`, async (req, _res, ctx) => {
    const userReq = await userMiddleware(req);
    const authenticatedReq = authGuard(userReq);

    if (authenticatedReq instanceof Error) {
      return delayedResponse(ctx.status(401), ctx.json({ message: authenticatedReq.message }));
    }

    const body = await req.json();

    const paramsOrError = (() => {
      try {
        return CreateGameInputSchema.parse(body);
      } catch (error: unknown) {
        return error as Error;
      }
    })();

    if (paramsOrError instanceof ZodError) {
      // Issueとともに422エラーを返す
      return delayedResponse(
        ctx.status(422),
        ctx.json({ message: 'Validation Error', errors: paramsOrError.issues })
      );
    }

    if (paramsOrError instanceof Error) {
      return delayedResponse(
        ctx.status(400),
        ctx.json({ message: paramsOrError?.message || 'Server Error' })
      );
    }

    const { difficulty, mode, prefectureId } = paramsOrError as ReturnType<
      typeof CreateGameInputSchema.parse
    >;

    try {
      const game = db.game.create({
        id: Math.random().toString(32).substring(2),
        state: 'PLAYING',
        difficulty,
        mode,
        prefectureId,
        userId: userReq.user!.sub,
      });

      const includedGame = gameRelationInclude(game as unknown as Game);

      const computedGame = computeGameData({ game: includedGame });

      persistDb('game');

      return delayedResponse(ctx.json(computedGame));
    } catch (error: any) {
      return delayedResponse(
        ctx.status(400),
        ctx.json({ message: error?.message || 'Server Error' })
      );
    }
  }),
  rest.post(`${env.VITE_API_URL}/games/:id/logging/turn-action`, async (req, _res, ctx) => {
    const userReq = await userMiddleware(req);
    const authenticatedReq = authGuard(userReq);

    if (authenticatedReq instanceof Error) {
      return delayedResponse(ctx.status(401), ctx.json({ message: authenticatedReq.message }));
    }

    const body = await req.json();

    const paramsOrError = (() => {
      try {
        return CreateGameLogInputSchema.parse(body);
      } catch (error: unknown) {
        return error as Error;
      }
    })();

    if (paramsOrError instanceof ZodError) {
      // Issueとともに422エラーを返す
      return delayedResponse(
        ctx.status(422),
        ctx.json({ message: 'Validation Error', errors: paramsOrError.issues })
      );
    }

    if (paramsOrError instanceof Error) {
      return delayedResponse(
        ctx.status(400),
        ctx.json({ message: paramsOrError?.message || 'Server Error' })
      );
    }

    const { factorPrefectureId, factorName, highLow, opponentId } = paramsOrError as ReturnType<
      typeof CreateGameLogInputSchema.parse
    >;

    try {
      const game = db.game.findFirst({
        where: {
          id: {
            equals: req.params.id as string,
          },
        },
      });

      const includedGame = gameRelationInclude(game as unknown as Game);

      // regionのprefecturesを取得
      const regionPrefectures = db.prefecture.findMany({
        where: {
          regionId: {
            equals: includedGame.prefecture.regionId,
          },
        },
      });

      const computedGame = computeGameData({ game: includedGame });

      // factorNameがdata.factorNameと一致するかつ
      // resultがWINのログのopponentIdを抽出
      const conqueredBySameFactorPrefectureIds = computedGame.logs
        .filter((log) => {
          const isSameFactorName = log.factorName === factorName;
          const isWin = log.result === 'WIN';

          return isSameFactorName && isWin;
        })
        .map((log) => log.opponentId);

      const factors = db.prefectureStats.findMany({
        where: {
          id: {
            in: [factorPrefectureId, opponentId, ...conqueredBySameFactorPrefectureIds],
          },
        },
      });

      // バックエンドでは以下のように必要なデータだけ取得しているが、
      // 絞り込まなくてもいいためそのままにする
      // select: {
      //   id: true,
      //   [PrefectureStatsConfig[data.factorName].camel]: true,
      // },

      // factorsの2つを比較しで、勝敗を決める
      const prefectureFactor = factors.find((f) => f.id === factorPrefectureId)?.[
        PrefectureStatsConfig[factorName].camel
      ] as number;

      const conqueredBySameFactorPrefectureFactor = factors
        .filter((f) => {
          return conqueredBySameFactorPrefectureIds.includes(f.id);
        })
        .reduce((prev, current) => {
          return prev + current[PrefectureStatsConfig[factorName].camel];
        }, 0);

      // 最初に選んだ都道府県の値 + 制覇した都道府県の値
      const allyFactor = prefectureFactor + conqueredBySameFactorPrefectureFactor;

      const opponentFactor = factors.find((f) => f.id === opponentId)?.[
        PrefectureStatsConfig[factorName].camel
      ] as number;

      const result: GameResult =
        // 同じ値であれば、勝利条件に関わらずDRAW
        allyFactor === opponentFactor
          ? 'DRAW'
          : // 高ければ勝つ場合
          highLow === 'HIGH'
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
            computedGame.conquereds.length === regionPrefectures.length - 2)) &&
        result === 'WIN' // 勝利した場合
      ) {
        db.game.update({
          where: {
            id: {
              equals: req.params.id as string,
            },
          },
          data: {
            state: 'FINISHED',
            clearTime: now.getTime() - computedGame.createdAt.getTime(),
            updatedAt: now.toString(),
          },
        });
      }

      const allGameLogLength = db.gameLog.findMany({}).length;

      const createdGameLog = db.gameLog.create({
        id: allGameLogLength + 1,
        result,
        highLow,
        factorPrefectureId,
        factorName,
        opponentId,
        gameId: req.params.id as string,
        createdAt: now.toString(),
        updatedAt: now.toString(),
      });

      const opponent = db.prefecture.findFirst({
        where: {
          id: {
            equals: opponentId,
          },
        },
      });

      persistDb('game');
      persistDb('gameLog');

      return delayedResponse(ctx.json({ ...createdGameLog, opponent }));
    } catch (error: any) {
      return delayedResponse(
        ctx.status(400),
        ctx.json({ message: error?.message || 'Server Error' })
      );
    }
  }),
  rest.patch(`${env.VITE_API_URL}/games/:id/give-up`, async (req, _res, ctx) => {
    const userReq = await userMiddleware(req);
    const authenticatedReq = authGuard(userReq);

    if (authenticatedReq instanceof Error) {
      return delayedResponse(ctx.status(401), ctx.json({ message: authenticatedReq.message }));
    }

    try {
      const game = db.game.update({
        where: {
          id: {
            equals: req.params.id as string,
          },
        },
        data: {
          state: 'GIVEN_UP',
        },
      });

      const includedGame = gameRelationInclude(game as unknown as Game);

      const computedGame = computeGameData({ game: includedGame });

      persistDb('game');

      return delayedResponse(ctx.json(computedGame));
    } catch (error: any) {
      return delayedResponse(
        ctx.status(400),
        ctx.json({ message: error?.message || 'Server Error' })
      );
    }
  }),
];
