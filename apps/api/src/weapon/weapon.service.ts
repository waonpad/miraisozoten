import { Injectable } from '@nestjs/common';
import { Weapon } from 'database';
import {
  PageNumberPagination,
  PageNumberPaginationOptions,
} from 'prisma-extension-pagination/dist/types';
import { CreateWeaponInputDto, UpdateWeaponInputDto, WeaponResponse } from 'schema/dist/weapon';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class WeaponService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllWeapon(): Promise<WeaponResponse[]> {
    return this.prisma.weapon.findMany();
  }

  async getAllWeaponWithPages(
    options: PageNumberPaginationOptions
  ): Promise<[WeaponResponse[], PageNumberPagination]> {
    return this.prisma.pg().weapon.paginate().withPages(options);
  }

  async getWeapon(id: Weapon['id']): Promise<WeaponResponse | null> {
    return this.prisma.weapon.findUnique({ where: { id } });
  }

  async createWeapon(data: CreateWeaponInputDto): Promise<WeaponResponse> {
    return this.prisma.weapon.create({ data });
  }

  async updateWeapon(id: Weapon['id'], data: UpdateWeaponInputDto): Promise<WeaponResponse> {
    return this.prisma.weapon.update({ where: { id }, data });
  }

  async deleteWeapon(id: Weapon['id']): Promise<WeaponResponse> {
    return this.prisma.weapon.delete({ where: { id } });
  }
}
