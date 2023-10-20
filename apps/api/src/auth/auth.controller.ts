import { Controller, HttpCode, Post, UseGuards, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserResponse, JwtDecodedUser } from 'schema/dist/user';
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
  async login(@User() user: JwtDecodedUser): Promise<UserResponse> {
    return this.authService.login(user);
  }

  @Get('me')
  async me(@User() user: JwtDecodedUser): Promise<UserResponse | null> {
    return this.authService.me(user);
  }
}
