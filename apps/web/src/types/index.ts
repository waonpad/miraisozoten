import type { FieldValues, RegisterOptions, Path } from 'react-hook-form';

// Test
export type User = { email: string };

export type BaseEntity = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
};

export type ReactHookFormValidationRules<T extends FieldValues> = Record<
  keyof T,
  Omit<RegisterOptions<T, Path<T>>, 'value'> | undefined
>;

export type ErrorResponse = {
  statusCode: number;
  message: string;
};

// error: AxiosError
// issue: {
//   code: string;
//   message: string;
//   path: (string | number)[];
//   validation: string;
// }
export type ValidationError<T> = {
  code: string;
  message: string;
  path: (string | number)[];
  validation: keyof T;
}[];

export type MutationErrorResponse<T> = ErrorResponse & {
  errors: ValidationError<T>;
};
