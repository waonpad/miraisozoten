import { Injectable } from '@nestjs/common';
import { Weapon } from 'database';
import {
  PageNumberPagination,
  PageNumberPaginationOptions,
} from 'prisma-extension-pagination/dist/types';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateWeaponDto } from './dto/create-weapon.dto';
import { UpdateWeaponDto } from './dto/update-weapon.dto';

@Injectable()
export class WeaponsService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllWeapons(): Promise<Weapon[]> {
    return this.prisma.weapon.findMany();
  }

  async getWeapon(id: number): Promise<Weapon> {
    return this.prisma.weapon.findUnique({ where: { id } });
  }

  async createWeapon(data: CreateWeaponDto): Promise<Weapon> {
    return this.prisma.weapon.create({ data });
  }

  async updateWeapon(id: number, data: UpdateWeaponDto): Promise<Weapon> {
    return this.prisma.weapon.update({ where: { id }, data });
  }

  async deleteWeapon(id: number): Promise<Weapon> {
    return this.prisma.weapon.delete({ where: { id } });
  }

  async getAllWeaponsWithPages(
    options: PageNumberPaginationOptions
  ): Promise<[Weapon[], PageNumberPagination]> {
    const pgWeapons = this.prisma.pg().weapon.paginate().withPages(options);

    return pgWeapons;
  }
}
