import { Inject, Injectable } from '@nestjs/common';
import { Weapon } from 'database';
import {
  PageNumberPaginationMeta,
  PageNumberPaginationOptions,
} from 'schema/dist/common/pagination';
import { CreateWeaponInputDto, UpdateWeaponInputDto, WeaponResponse } from 'schema/dist/weapon';
import { InjectionToken } from 'src/config/environments/constants/injection-token.enum';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class WeaponService {
  constructor(@Inject(InjectionToken.PRISMA_SERVICE) private readonly prisma: PrismaService) {}

  async getAllWeapon(): Promise<WeaponResponse[]> {
    return this.prisma.weapon.findMany();
  }

  async getAllWeaponWithPages(
    options: PageNumberPaginationOptions
  ): Promise<[WeaponResponse[], PageNumberPaginationMeta]> {
    return this.prisma
      .pg()
      .weapon.paginate()
      .withPages({ ...options, includePageCount: true });
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
