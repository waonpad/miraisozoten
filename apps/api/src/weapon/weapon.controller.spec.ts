import { Test, TestingModule } from '@nestjs/testing';
import { InjectionToken } from 'src/config/environments/constants/injection-token.enum';
import { BasePrismaService, PrismaService } from '../prisma/prisma.service';
import { WeaponController } from './weapon.controller';
import { WeaponService } from './weapon.service';

describe('WeaponController', () => {
  let controller: WeaponController;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let service: WeaponService;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WeaponController],
      providers: [
        WeaponService,
        {
          provide: InjectionToken.PRISMA_SERVICE,
          useFactory: () => {
            return new BasePrismaService().withExtensions();
          },
        },
      ],
    }).compile();

    controller = module.get<WeaponController>(WeaponController);
    service = module.get<WeaponService>(WeaponService);
    prismaService = module.get<PrismaService>(InjectionToken.PRISMA_SERVICE);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
