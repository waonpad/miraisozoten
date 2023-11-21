import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import * as admin from 'firebase-admin';
import { JwtDecodedUser } from 'schema/src/user';
import { Env } from 'src/config/environments/env.service';

@Injectable()
export class UserMiddleware implements NestMiddleware {
  constructor(private env: Env) {}

  async use(req: Request, _res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token || token === 'null') {
      return next();
    }

    try {
      const decoded = await admin.auth().verifyIdToken(token);

      const userRecord = await admin.auth().getUser(decoded.sub);

      if (decoded?.sub) {
        (req.user as JwtDecodedUser) = {
          ...decoded,
          userRecord,
        };
      }

      return next();
    } catch (err) {
      return next();
    }
  }
}
