import { Inject, Injectable } from '@nestjs/common';
import { Game } from 'database';

import { PrefectureStatsConfig } from 'schema/dist/prefecture/stats';
import {
  CreateGameInputDto,
  UpdateGameInputDto,
  GameResponse,
  GameResult,
} from 'schema/dist/todofuken/game';
import { CreateGameLogInputDto, GameLogResponse } from 'schema/dist/todofuken/game/log';
import { JwtDecodedUser } from 'schema/dist/user';
import { InjectionToken } from 'src/config/environments/constants/injection-token.enum';
import { PrismaService } from 'src/prisma/prisma.service';
import { computeGameData } from 'src/util/compute-game-data.util';
import { gameDefaultInclude } from './config/game-include-default';

@Injectable()
export class GameService {
  constructor(@Inject(InjectionToken.PRISMA_SERVICE) private readonly prisma: PrismaService) {}

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
        state: 'PREPARING', // 作成した時点でターンのサイクルに入るので、STARTINGではなくPREPARING
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
    const game = await this.prisma.game.findUnique({
      // りクエストユーザーがゲームの所持者でない場合、ここでエラーになる
      where: { id, userId: user.sub },
      select: {
        prefecture: true,
      },
    });

    const prefectureId = game?.prefecture.id;

    const factors = await this.prisma.prefectureStats.findMany({
      where: {
        OR: [{ id: prefectureId }, { id: data.opponentId }],
      },
      select: {
        id: true,
        [PrefectureStatsConfig[data.factorName].camel]: true,
      },
    });

    // factorsの2つを比較しで、勝敗を決める
    const prefectureFactor = factors.find((f) => f.id === prefectureId)?.[
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

    // ゲームの状態を更新する
    await this.prisma.game.update({
      where: { id, userId: user.sub },
      data: {
        state: result === 'LOSE' ? 'FINISHED' : 'ACTING',
      },
    });

    return this.prisma.gameLog.create({
      data: {
        result,
        highLow: data.highLow,
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
}
