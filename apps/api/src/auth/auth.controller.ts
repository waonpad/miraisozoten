import { Controller, HttpCode, Post, UseGuards, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { User as UserData } from 'database';
import { JwtDecodedUser } from 'src/user/jwt-decoded-user';
import { User } from 'src/user/user.decorator';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(200)
  @UseGuards(AuthGuard)
  async login(@User() user: JwtDecodedUser): Promise<UserData> {
    return this.authService.login(user);
  }

  @Get('me')
  @UseGuards(AuthGuard)
  async me(@User() user: JwtDecodedUser): Promise<UserData> {
    return this.authService.me(user);
  }
}
