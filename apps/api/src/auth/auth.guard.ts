import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();

    // user.middleware.tsでreq.userにユーザー情報かnullをセットしているので、
    // それがあれば認証済みとみなす
    if (!request.user) {
      throw new UnauthorizedException();
    }

    return true;
  }
}
