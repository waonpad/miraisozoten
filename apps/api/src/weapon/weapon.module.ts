import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { WeaponController } from './weapon.controller';
import { WeaponService } from './weapon.service';

@Module({
  imports: [],
  controllers: [WeaponController],
  providers: [WeaponService, PrismaService],
})
export class WeaponModule {}
