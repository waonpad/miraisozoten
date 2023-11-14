import { createResponseComposition, context, ResponseFunction } from 'msw';

const isTesting = process.env.NODE_ENV === 'test';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const delayedResponse: ResponseFunction<any> = createResponseComposition(undefined, [
  context.delay(isTesting ? 0 : 1000),
]);
