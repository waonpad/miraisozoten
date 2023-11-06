import { Inject, Injectable } from '@nestjs/common';
import { PrefectureStatsMetadata } from 'database';

import { PrefectureStatsMetadataResponse } from 'schema/dist/prefecture/stats/metadata';
import { InjectionToken } from 'src/config/environments/constants/injection-token.enum';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PrefectureStatsMetadataService {
  constructor(@Inject(InjectionToken.PRISMA_SERVICE) private readonly prisma: PrismaService) {}

  async getAllPrefectureStatsMetadata(): Promise<PrefectureStatsMetadataResponse[]> {
    return this.prisma.prefectureStatsMetadata.findMany();
  }

  async getPrefectureStatsMetadata(
    id: PrefectureStatsMetadata['id']
  ): Promise<PrefectureStatsMetadataResponse | null> {
    return this.prisma.prefectureStatsMetadata.findUnique({ where: { id } });
  }

  async getPrefectureStatsMetadataByName(
    name: PrefectureStatsMetadata['name']
  ): Promise<PrefectureStatsMetadataResponse | null> {
    return this.prisma.prefectureStatsMetadata.findFirst({ where: { name } });
  }
}
