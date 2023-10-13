// Generouted, changes to this file will be overriden
/* eslint-disable */

import { components, hooks, utils } from '@generouted/react-router/client';

export type Path =
  | `/`
  | `/about`
  | `/login`
  | `/logout`
  | `/posts`
  | `/posts/:id`
  | `/posts/:id/:pid?`
  | `/posts/:id/deep`
  | `/private`
  | `/splat/*`
  | `/weapons`
  | `/weapons/:id`
  | `/weapons/:id/update`
  | `/weapons/create`;

export type Params = {
  '/posts/:id': { id: string };
  '/posts/:id/:pid?': { id: string; pid?: string };
  '/posts/:id/deep': { id: string };
  '/splat/*': { '*': string };
  '/weapons/:id': { id: string };
  '/weapons/:id/update': { id: string };
};

export type ModalPath = `/modal`;

export const { Link, Navigate } = components<Path, Params>();
export const { useModals, useNavigate, useParams } = hooks<Path, Params, ModalPath>();
export const { redirect } = utils<Path, Params>();
