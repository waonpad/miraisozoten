import { Inject, Injectable } from '@nestjs/common';
import { Prefecture } from 'database';

import { PrefectureResponse } from 'schema/dist/prefecture';
import { PrefectureStatsResponse } from 'schema/dist/prefecture/stats';
import { InjectionToken } from 'src/config/environments/constants/injection-token.enum';
import { PrismaService } from 'src/prisma/prisma.service';
import { prefectureIncludeDefault } from './config/prefecture-include-default';

@Injectable()
export class PrefectureService {
  constructor(@Inject(InjectionToken.PRISMA_SERVICE) private readonly prisma: PrismaService) {}

  async getAllPrefecture(): Promise<PrefectureResponse[]> {
    return this.prisma.prefecture.findMany({
      include: prefectureIncludeDefault,
    });
  }

  async getPrefecture(id: Prefecture['id']): Promise<PrefectureResponse | null> {
    return await this.prisma.prefecture.findUnique({
      where: { id },
      include: prefectureIncludeDefault,
    });
  }

  async getPrefectureStats(id: Prefecture['id']): Promise<PrefectureStatsResponse | null> {
    return await this.prisma.prefectureStats.findUnique({
      where: { prefectureId: id },
    });
  }

  async getPrefectureNeighbors(id: Prefecture['id']): Promise<PrefectureResponse[] | null> {
    return await this.prisma.prefecture.findMany({
      where: { neighbors: { some: { id } } },
      include: prefectureIncludeDefault,
    });
  }
}
