/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { DefaultBodyType, MockedRequest, RestHandler, rest } from 'msw';
import { JwtDecodedUser } from 'schema/dist/user';

import { env } from '@/constants/env';

import { db, persistDb } from '../db';
import { authGuard } from '../guards/auth-guard';
import { userMiddleware } from '../middleware/user-middleware';
import { delayedResponse } from '../utils/delayed-response';

export const authHandlers: RestHandler<MockedRequest<DefaultBodyType>>[] = [
  rest.post(`${env.VITE_API_URL}/auth/login`, async (req, _res, ctx) => {
    const userReq = await userMiddleware(req);
    const authenticatedReq = authGuard(userReq);

    if (authenticatedReq instanceof Error) {
      return delayedResponse(ctx.status(401), ctx.json({ message: authenticatedReq.message }));
    }

    const reqUser = authenticatedReq.user as JwtDecodedUser;

    try {
      const existingUser = db.user.findFirst({
        where: {
          id: {
            equals: reqUser?.sub,
          },
        },
      });

      // 匿名ログインの場合
      if (reqUser.provider_id === 'anonymous') {
        reqUser.name = 'ゲスト';
        reqUser.email = `${reqUser.sub}@example.com`;
        reqUser.email_verified = false;
      }

      // 匿名ログインからソーシャルアカウントにリンクした場合
      // ソーシャルアカウントのデータがマウントされないので、プロバイダーのデータから取り出してくる
      // Google以外の場合を検証していない
      // Googleログイン以外をすることを想定していないので、providerData[0]としている
      if (!reqUser.name) {
        reqUser.name = reqUser.userRecord.providerData[0].displayName;
        reqUser.picture = reqUser.userRecord.providerData[0].photoURL;
      }

      const user = existingUser
        ? db.user.update({
            where: {
              id: {
                equals: reqUser.sub,
              },
            },
            data: {
              name: reqUser.name,
              email: reqUser.email,
              emailVerified: reqUser.email_verified,
              image: reqUser.picture,
              updatedAt: new Date().toString(),
            },
          })
        : db.user.create({
            id: reqUser.sub,
            name: reqUser.name,
            email: reqUser.email,
            emailVerified: reqUser.email_verified,
            image: reqUser.picture,
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

  rest.get(`${env.VITE_API_URL}/auth/me`, async (req, _res, ctx) => {
    try {
      const { user } = await userMiddleware(req);

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
