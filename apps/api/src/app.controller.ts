import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { JwtDecodedUser } from 'schema/dist/user';
import { AppService } from './app.service';
import { AuthGuard } from './auth/auth.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @UseGuards(AuthGuard)
  @Get('danger')
  getDanger(@Req() req: Request): JwtDecodedUser {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return req.user;
  }
}
