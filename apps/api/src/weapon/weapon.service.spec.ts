import { Test, TestingModule } from '@nestjs/testing';
import { WeaponAttribute } from 'database';
import { PrismaService } from '../prisma/prisma.service';
import { WeaponService } from './weapon.service';

describe('WeaponService', () => {
  let service: WeaponService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WeaponService,
        {
          provide: PrismaService,
          useValue: {
            weapon: {
              findMany: jest.fn(),
              paginate: jest.fn().mockReturnThis(),
              withPages: jest.fn(),
              findUnique: jest.fn(),
              create: jest.fn(),
              update: jest.fn(),
              delete: jest.fn(),
            },
            pg: jest.fn().mockReturnThis(),
          },
        },
      ],
    }).compile();

    service = module.get<WeaponService>(WeaponService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAllWeapon', () => {
    it('should return an array of Weapon', async () => {
      const weapons = [
        {
          id: 1,
          name: 'weapon1',
          attackPower: 100,
          attribute: WeaponAttribute.SWORD,
        },
      ];

      (prismaService.weapon.findMany as jest.Mock).mockResolvedValue(weapons);

      const result = await service.getAllWeapon();

      expect(result).toEqual(weapons);
      expect(prismaService.weapon.findMany).toHaveBeenCalled();
    });
  });

  describe('getAllWeaponWithPages', () => {
    it('should return an array of Weapon with pagination', async () => {
      const weapons = [
        {
          id: 1,
          name: 'weapon1',
          attackPower: 100,
          attribute: WeaponAttribute.SWORD,
        },
      ];

      const paginationOptions = {
        page: 1,
        limit: 10,
        includePageCount: true,
      };

      const pagination = {
        isFirstPage: true,
        isLastPage: false,
        currentPage: 1,
        previousPage: null,
        nextPage: 2,
        pageCount: 10,
        totalCount: 100,
      };

      (prismaService.pg().weapon.paginate().withPages as jest.Mock).mockResolvedValue([
        weapons,
        pagination,
      ]);

      const result = await service.getAllWeaponWithPages(paginationOptions);

      expect(result).toEqual([weapons, pagination]);
      expect(prismaService.pg().weapon.paginate().withPages).toHaveBeenCalledWith(
        paginationOptions
      );
    });
  });

  describe('getWeapon', () => {
    it('should return a Weapon', async () => {
      const weapon = {
        id: 1,
        name: 'weapon1',
        attackPower: 100,
        attribute: WeaponAttribute.SWORD,
      };

      (prismaService.weapon.findUnique as jest.Mock).mockResolvedValue(weapon);

      const result = await service.getWeapon(1);

      expect(result).toEqual(weapon);
      expect(prismaService.weapon.findUnique).toHaveBeenCalledWith({ where: { id: 1 } });
    });
  });

  describe('createWeapon', () => {
    it('should create a Weapon', async () => {
      const weapon = {
        name: 'weapon1',
        attackPower: 100,
        attribute: WeaponAttribute.SWORD,
      };

      (prismaService.weapon.create as jest.Mock).mockResolvedValue(weapon);

      const result = await service.createWeapon(weapon);

      expect(result).toEqual(weapon);
      expect(prismaService.weapon.create).toHaveBeenCalledWith({ data: weapon });
    });
  });

  describe('updateWeapon', () => {
    it('should update a Weapon', async () => {
      const updateWeaponDto = {
        name: 'weapon2',
        attackPower: 200,
        attribute: WeaponAttribute.BOW,
      };

      const updatedWeapon = {
        id: 1,
        name: 'weapon2',
        attackPower: 200,
        attribute: WeaponAttribute.BOW,
      };

      (prismaService.weapon.update as jest.Mock).mockResolvedValue(updatedWeapon);

      const result = await service.updateWeapon(1, updateWeaponDto);

      expect(result).toEqual(updatedWeapon);
      expect(prismaService.weapon.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: updateWeaponDto,
      });
    });
  });

  describe('deleteWeapon', () => {
    it('should delete a Weapon', async () => {
      const weapon = {
        id: 1,
        name: 'weapon1',
        attackPower: 100,
        attribute: WeaponAttribute.BOW,
      };

      (prismaService.weapon.delete as jest.Mock).mockResolvedValue(weapon);

      const result = await service.deleteWeapon(1);

      expect(result).toEqual(weapon);
      expect(prismaService.weapon.delete).toHaveBeenCalledWith({ where: { id: 1 } });
    });
  });
});
