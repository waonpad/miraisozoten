import { Injectable } from '@nestjs/common';
import {
  PageNumberPagination,
  PageNumberPaginationOptions,
} from 'prisma-extension-pagination/dist/types';
import { CreateWeaponInputDto, UpdateWeaponInputDto, WeaponResponse } from 'schema/dist/weapon';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class WeaponsService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllWeapons(): Promise<WeaponResponse[]> {
    return this.prisma.weapon.findMany();
  }

  async getWeapon(id: number): Promise<WeaponResponse | null> {
    return this.prisma.weapon.findUnique({ where: { id } });
  }

  async createWeapon(data: CreateWeaponInputDto): Promise<WeaponResponse> {
    return this.prisma.weapon.create({ data });
  }

  async updateWeapon(id: number, data: UpdateWeaponInputDto): Promise<WeaponResponse> {
    return this.prisma.weapon.update({ where: { id }, data });
  }

  async deleteWeapon(id: number): Promise<WeaponResponse> {
    return this.prisma.weapon.delete({ where: { id } });
  }

  async getAllWeaponsWithPages(
    options: PageNumberPaginationOptions
  ): Promise<[WeaponResponse[], PageNumberPagination]> {
    const pgWeapons = this.prisma.pg().weapon.paginate().withPages(options);

    return pgWeapons;
  }
}
