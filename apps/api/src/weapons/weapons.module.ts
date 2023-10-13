import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { WeaponsController } from './weapons.controller';
import { WeaponsService } from './weapons.service';

@Module({
  imports: [],
  controllers: [WeaponsController],
  providers: [WeaponsService, PrismaService],
})
export class WeaponsModule {}
