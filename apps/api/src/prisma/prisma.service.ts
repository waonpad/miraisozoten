import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from 'database';
import { paginate } from 'prisma-extension-pagination';
import { GameDifficulty } from 'schema/dist/todoufuken/game';

export type PrismaService = ReturnType<BasePrismaService['withExtensions']> & {
  pg(): ReturnType<BasePrismaService['pg']>;
};

@Injectable()
export class BasePrismaService extends PrismaClient implements OnModuleInit {
  withExtensions() {
    return this.$extends({
      result: {
        game: {
          hideData: {
            needs: { difficulty: true },
            compute(data) {
              return (['HIDDEN_NORMAL', 'HARD'] satisfies GameDifficulty[]).some(
                (d) => d === data.difficulty
              );
            },
          },
        },
      },
    });
  }

  async onModuleInit() {
    await this.$connect();
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit' as never, async () => {
      await app.close();
    });
  }

  // Setting up prisma-extension-pagination
  pg() {
    return this.$extends({
      model: {
        $allModels: {
          paginate,
        },
      },
    });
  }
  // Usage
  // this.prismaService.pg().user.paginate().withPages({
  //   limit: 10,
  // });
}
