import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import jet_decode, { InvalidTokenError } from 'jwt-decode';
import { Env } from 'src/config/environments/env.service';
import { JwtDecodedUser } from './jwt-decoded-user';

@Injectable()
export class UserMiddleware implements NestMiddleware {
  constructor(private env: Env) {}

  async use(req: Request, _res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(' ')[1];

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
