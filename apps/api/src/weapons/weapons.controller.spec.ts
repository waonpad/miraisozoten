import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { WeaponsController } from './weapons.controller';
import { WeaponsService } from './weapons.service';

describe('WeaponsController', () => {
  let controller: WeaponsController;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let service: WeaponsService;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WeaponsController],
      providers: [WeaponsService, PrismaService],
    }).compile();

    controller = module.get<WeaponsController>(WeaponsController);
    service = module.get<WeaponsService>(WeaponsService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
