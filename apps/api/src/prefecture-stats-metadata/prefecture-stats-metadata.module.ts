import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrefectureStatsMetadataController } from './prefecture-stats-metadata.controller';
import { PrefectureStatsMetadataService } from './prefecture-stats-metadata.service';

@Module({
  imports: [PrismaModule],
  controllers: [PrefectureStatsMetadataController],
  providers: [PrefectureStatsMetadataService],
})
export class PrefectureStatsMetadataModule {}
