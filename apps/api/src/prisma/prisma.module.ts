import { Module } from '@nestjs/common';
import { InjectionToken } from 'src/config/environments/constants/injection-token.enum';
import { BasePrismaService } from './prisma.service';

@Module({
  providers: [
    {
      provide: InjectionToken.PRISMA_SERVICE,
      useFactory: () => {
        return new BasePrismaService().withExtensions();
      },
    },
  ],
  exports: [InjectionToken.PRISMA_SERVICE],
})
export class PrismaModule {}
