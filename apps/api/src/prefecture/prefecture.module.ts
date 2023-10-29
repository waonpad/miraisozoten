import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrefectureController } from './prefecture.controller';
import { PrefectureService } from './prefecture.service';

@Module({
  imports: [PrismaModule],
  controllers: [PrefectureController],
  providers: [PrefectureService],
})
export class PrefectureModule {}
