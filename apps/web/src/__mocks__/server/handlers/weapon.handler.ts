/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { DefaultBodyType, MockedRequest, RestHandler, rest } from 'msw';
import { CreateWeaponInputSchema, UpdateWeaponInputSchema } from 'schema/dist/weapon';
import { ZodError } from 'zod';

import { env } from '@/constants/env';

import { db, persistDb } from '../db';
import { authGuard, delayedResponse, userMiddleware } from '../utils';

export const weaponHandlers: RestHandler<MockedRequest<DefaultBodyType>>[] = [
  rest.get(`${env.VITE_API_URL}/weapons`, (_req, _res, ctx) => {
    try {
      const weapons = db.weapon.getAll();

      return delayedResponse(ctx.json(weapons));
    } catch (error: any) {
      return delayedResponse(
        ctx.status(400),
        ctx.json({ message: error?.message || 'Server Error' })
      );
    }
  }),
  rest.get(`${env.VITE_API_URL}/weapons/pages`, (req, _res, ctx) => {
    try {
      const query = req.url.searchParams;
      const page = Number(query.get('page')) || 1;
      const limit = Number(query.get('limit')) || 10;

      const weapons = db.weapon.findMany({
        skip: (page - 1) * limit,
        take: limit,
      });

      const meta = {
        isFirstPage: page === 1,
        isLastPage: weapons.length < limit,
        currentPage: page,
        previousPage: page > 1 ? page - 1 : null,
        nextPage: weapons.length < limit ? null : page + 1,
        pageCount: Math.ceil(db.weapon.count() / limit),
        totalCount: db.weapon.count(),
      };

      return delayedResponse(ctx.json([weapons, meta]));
    } catch (error: any) {
      return delayedResponse(
        ctx.status(400),
        ctx.json({ message: error?.message || 'Server Error' })
      );
    }
  }),
  rest.get(`${env.VITE_API_URL}/weapons/:id`, (req, _res, ctx) => {
    try {
      const id = Number(req.params.id);

      const weapon = db.weapon.findFirst({
        where: {
          id: {
            equals: id,
          },
        },
      });

      return delayedResponse(ctx.json(weapon));
    } catch (error: any) {
      return delayedResponse(
        ctx.status(400),
        ctx.json({ message: error?.message || 'Server Error' })
      );
    }
  }),
  rest.post(`${env.VITE_API_URL}/weapons`, async (req, _res, ctx) => {
    const authenticatedReq = authGuard(userMiddleware(req));

    if (authenticatedReq instanceof Error) {
      return delayedResponse(ctx.status(401), ctx.json({ message: authenticatedReq.message }));
    }

    try {
      CreateWeaponInputSchema.parse(req.body);
    } catch (error: any) {
      if (!(error instanceof ZodError)) throw error;

      return delayedResponse(
        ctx.status(422),
        ctx.json({ message: 'Validation failed', errors: error.issues })
      );
    }

    try {
      const body = await req.json();

      const weapon = db.weapon.create({
        ...body,
        id: db.weapon.count() + 1,
      });

      persistDb('weapon');

      return delayedResponse(ctx.status(201), ctx.json(weapon));
    } catch (error: any) {
      return delayedResponse(
        ctx.status(400),
        ctx.json({ message: error?.message || 'Server Error' })
      );
    }
  }),
  rest.patch(`${env.VITE_API_URL}/weapons/:id`, async (req, _res, ctx) => {
    const authenticatedReq = authGuard(userMiddleware(req));

    if (authenticatedReq instanceof Error) {
      return delayedResponse(ctx.status(401), ctx.json({ message: authenticatedReq.message }));
    }

    try {
      UpdateWeaponInputSchema.parse(req.body);
    } catch (error: any) {
      if (!(error instanceof ZodError)) throw error;

      return delayedResponse(
        ctx.status(422),
        ctx.json({ message: 'Validation failed', errors: error.issues })
      );
    }

    try {
      const id = Number(req.params.id);
      const body = await req.json();

      const weapon = db.weapon.update({
        where: {
          id: {
            equals: id,
          },
        },
        data: body,
      });

      persistDb('weapon');

      return delayedResponse(ctx.json(weapon));
    } catch (error: any) {
      return delayedResponse(
        ctx.status(400),
        ctx.json({ message: error?.message || 'Server Error' })
      );
    }
  }),
  rest.delete(`${env.VITE_API_URL}/weapons/:id`, async (req, _res, ctx) => {
    const authenticatedReq = authGuard(userMiddleware(req));

    if (authenticatedReq instanceof Error) {
      return delayedResponse(ctx.status(401), ctx.json({ message: authenticatedReq.message }));
    }

    try {
      const id = Number(req.params.id);

      const weapon = db.weapon.delete({
        where: {
          id: {
            equals: id,
          },
        },
      });

      persistDb('weapon');

      return delayedResponse(ctx.json(weapon));
    } catch (error: any) {
      return delayedResponse(
        ctx.status(400),
        ctx.json({ message: error?.message || 'Server Error' })
      );
    }
  }),
];
