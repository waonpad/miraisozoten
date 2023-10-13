import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from 'database';
import { paginate } from 'prisma-extension-pagination';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
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
