import { Inject, Injectable } from '@nestjs/common';

import { PrefectureResponse } from 'schema/dist/prefecture';
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
}
