import { Inject, Injectable } from '@nestjs/common';

import { PrefectureStatsMetadataResponse } from 'schema/dist/prefecture/stats/metadata';
import { InjectionToken } from 'src/config/environments/constants/injection-token.enum';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PrefectureStatsMetadataService {
  constructor(@Inject(InjectionToken.PRISMA_SERVICE) private readonly prisma: PrismaService) {}

  async getAllPrefectureStatsMetadata(): Promise<PrefectureStatsMetadataResponse[]> {
    return this.prisma.prefectureStatsMetadata.findMany();
  }
}
