import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { WeaponAttribute } from './constants/weapon-attribute.enum';
import { WeaponsService } from './weapons.service';

describe('WeaponsService', () => {
  let service: WeaponsService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WeaponsService,
        {
          provide: PrismaService,
          useValue: {
            weapon: {
              findMany: jest.fn(),
              findUnique: jest.fn(),
              create: jest.fn(),
              update: jest.fn(),
              delete: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<WeaponsService>(WeaponsService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAllWeapons', () => {
    it('should return an array of weapons', async () => {
      const weapons = [
        {
          id: 1,
          name: 'weapon1',
          attackPower: 100,
          attribute: WeaponAttribute.Sword,
        },
      ];
      (prismaService.weapon.findMany as jest.Mock).mockResolvedValue(weapons);

      const result = await service.getAllWeapons();

      expect(result).toEqual(weapons);
      expect(prismaService.weapon.findMany).toHaveBeenCalled();
    });
  });

  describe('getWeapon', () => {
    it('should return a weapon', async () => {
      const weapon = {
        id: 1,
        name: 'weapon1',
        attackPower: 100,
        attribute: WeaponAttribute.Sword,
      };
      (prismaService.weapon.findUnique as jest.Mock).mockResolvedValue(weapon);

      const result = await service.getWeapon(1);

      expect(result).toEqual(weapon);
      expect(prismaService.weapon.findUnique).toHaveBeenCalledWith({ where: { id: 1 } });
    });
  });

  describe('createWeapon', () => {
    it('should create a weapon', async () => {
      const weapon = {
        name: 'weapon1',
        attackPower: 100,
        attribute: WeaponAttribute.Sword,
      };
      (prismaService.weapon.create as jest.Mock).mockResolvedValue(weapon);

      const result = await service.createWeapon(weapon);

      expect(result).toEqual(weapon);
      expect(prismaService.weapon.create).toHaveBeenCalledWith({ data: weapon });
    });
  });

  describe('updateWeapon', () => {
    it('should update a weapon', async () => {
      const updateWeaponDto = {
        name: 'weapon2',
        attackPower: 200,
        attribute: WeaponAttribute.Axe,
      };

      const updatedWeapon = {
        id: 1,
        name: 'weapon2',
        attackPower: 200,
        attribute: WeaponAttribute.Axe,
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
    it('should delete a weapon', async () => {
      const weapon = {
        id: 1,
        name: 'weapon1',
        attackPower: 100,
        attribute: WeaponAttribute.Sword,
      };
      (prismaService.weapon.delete as jest.Mock).mockResolvedValue(weapon);

      const result = await service.deleteWeapon(1);

      expect(result).toEqual(weapon);
      expect(prismaService.weapon.delete).toHaveBeenCalledWith({ where: { id: 1 } });
    });
  });
});
