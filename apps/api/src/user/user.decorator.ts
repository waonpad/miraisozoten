import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { JwtDecodedUser } from 'schema/src/user';

export const User = createParamDecorator((data: keyof JwtDecodedUser, ctx: ExecutionContext) => {
  const request: Request = ctx.switchToHttp().getRequest();
  if (data) {
    const user = request.user as JwtDecodedUser;
    return user ? user[data] : null;
  }
  return request.user as JwtDecodedUser;
});
