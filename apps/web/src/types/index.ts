import { ZodIssue } from 'zod';

export type ErrorResponse = {
  statusCode: number;
  message: string;
};

export type MutationErrorResponse = ErrorResponse & {
  errors: ZodIssue[];
};
