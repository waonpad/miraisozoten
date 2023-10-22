/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { DefaultBodyType, MockedRequest, RestHandler, rest } from 'msw';
import { JwtDecodedUser } from 'schema/dist/user';

import { env } from '@/constants/env';

import { db, persistDb } from '../db';
import { authGuard, delayedResponse, userMiddleware } from '../utils';

export const authHandlers: RestHandler<MockedRequest<DefaultBodyType>>[] = [
  rest.post(`${env.VITE_API_URL}/auth/login`, async (req, _res, ctx) => {
    const userReq = userMiddleware(req);
    const authenticatedReq = authGuard(userReq);

    const reqUser = authenticatedReq.user as JwtDecodedUser;
    try {
      const existingUser = db.user.findFirst({
        where: {
          id: {
            equals: reqUser?.sub,
          },
        },
      });

      const user = existingUser
        ? db.user.update({
            where: {
              id: {
                equals: reqUser?.sub,
              },
            },
            data: {
              name: reqUser?.name,
              email: reqUser?.email,
              emailVerified: reqUser?.email_verified,
              image: reqUser?.picture,
              updatedAt: new Date().toString(),
            },
          })
        : db.user.create({
            id: reqUser?.sub,
            name: reqUser?.name,
            email: reqUser?.email,
            emailVerified: reqUser?.email_verified,
            image: reqUser?.picture,
            createdAt: new Date().toString(),
            updatedAt: new Date().toString(),
          });

      persistDb('user');

      return delayedResponse(ctx.json(user));
    } catch (error: any) {
      return delayedResponse(
        ctx.status(400),
        ctx.json({ message: error?.message || 'Server Error' })
      );
    }
  }),

  rest.get(`${env.VITE_API_URL}/auth/me`, (req, _res, ctx) => {
    try {
      const { user } = userMiddleware(req);

      if (!user) {
        return delayedResponse(ctx.json(null));
      }

      const dbUser = db.user.findFirst({
        where: {
          id: {
            equals: user.sub,
          },
        },
      });

      return delayedResponse(ctx.json(dbUser));
    } catch (error: any) {
      return delayedResponse(
        ctx.status(400),
        ctx.json({ message: error?.message || 'Server Error' })
      );
    }
  }),
];
