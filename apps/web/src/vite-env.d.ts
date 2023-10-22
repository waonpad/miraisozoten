/// <reference types="vite/client" />

import { JwtDecodedUser } from 'schema/dist/user';

declare module '*.yml' {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const data: any;
  export default data;
}

declare module 'msw' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface RestRequest extends RestRequest {
    user?: JwtDecodedUser;
  }
}
