import { Inject, Injectable } from '@nestjs/common';
import { Game } from 'database';

import { PageNumberPaginationMeta } from 'schema/dist/common/pagination';
import { PrefectureStatsConfig } from 'schema/dist/prefecture/stats';
import {
  CreateGameInputDto,
  UpdateGameInputDto,
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

  async getAllGame(query: GetGamesQueryDto): Promise<[GameResponse[], PageNumberPaginationMeta]> {
    const { page, limit, ...rest } = query;

    const games = await this.prisma
      .pg()
      .game.paginate({ where: { ...rest }, include: gameDefaultInclude })
      .withPages({ page, limit, includePageCount: true });

    const computedGames = await Promise.all(
      games[0].map((game) => computeGameData({ game, prisma: this.prisma }))
    );

    // NOTICE: なぜか型の補完が行われないが、正常にprismaの拡張によって計算されているため
    // 型アサーションしている
    return [computedGames as GameResponse[], games[1]];
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

  async updateGame(
    id: Game['id'],
    data: UpdateGameInputDto,
    user: JwtDecodedUser
  ): Promise<GameResponse> {
    const game = await this.prisma.game.update({
      where: { id, userId: user.sub },
      data,
      include: gameDefaultInclude,
    });

    return computeGameData({ game, prisma: this.prisma });
  }

  // TODO: 複数回りクエストが送られてきても、1ターンに1回しか処理されないようにする
  // TODO: 隣接県の整合性がとれているかどうかをチェックする
  async submitGameTurnAct(
    id: Game['id'],
    data: CreateGameLogInputDto,
    user: JwtDecodedUser
  ): Promise<GameLogResponse> {
    // どの都道府県のデータを使うのか
    const allyPrefectureId = data.factorPrefectureId;

    const factors = await this.prisma.prefectureStats.findMany({
      where: {
        OR: [{ id: allyPrefectureId }, { id: data.opponentId }],
      },
      select: {
        id: true,
        [PrefectureStatsConfig[data.factorName].camel]: true,
      },
    });

    // factorsの2つを比較しで、勝敗を決める
    const prefectureFactor = factors.find((f) => f.id === allyPrefectureId)?.[
      PrefectureStatsConfig[data.factorName].camel
    ];
    const opponentFactor = factors.find((f) => f.id === data.opponentId)?.[
      PrefectureStatsConfig[data.factorName].camel
    ];

    const result: GameResult =
      // 同じ値であれば、勝利条件に関わらずDRAW
      prefectureFactor === opponentFactor
        ? 'DRAW'
        : // 高ければ勝つ場合
        data.highLow === 'HIGH'
        ? prefectureFactor > opponentFactor
          ? 'WIN'
          : 'LOSE'
        : // 低ければ勝つ場合
        prefectureFactor < opponentFactor
        ? 'WIN'
        : 'LOSE';

    const game = await this.prisma.game.findUniqueOrThrow({
      where: { id, userId: user.sub },
      include: gameDefaultInclude,
    });

    const computedGame = computeGameData({ game, prisma: this.prisma });

    // 隣接県が無いということは、全ての県を回りきったということなので、ゲームを終了する
    if ((await computedGame).neighbors.length === 0) {
      await this.prisma.game.update({
        where: { id, userId: user.sub },
        data: {
          state: 'FINISHED',
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
