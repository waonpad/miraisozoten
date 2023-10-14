import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import jet_decode, { InvalidTokenError } from 'jwt-decode';
import { JwtDecodedUser } from 'schema/src/user';
import { Env } from 'src/config/environments/env.service';

@Injectable()
export class UserMiddleware implements NestMiddleware {
  constructor(private env: Env) {}

  async use(req: Request, _res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return next();
    }

    try {
      const decoded = jet_decode<JwtDecodedUser>(token);

      if (decoded?.sub) {
        req.user = decoded;
      }

      return next();
    } catch (err) {
      if (!(err instanceof InvalidTokenError)) {
        console.error('UserMiddleware error', err);
      }

      return next();
    }
  }
}
