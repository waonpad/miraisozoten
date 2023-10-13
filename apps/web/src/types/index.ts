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
  error: {
    code: number;
    message: string;
    // type?:
  };
};

export type ValidationError<T> = {
  validation: {
    [key in keyof T]?: string;
  };
};

// param.subParamのように、ネストしている場合はピリオドでつなげて返ってくることを想定している
export type MutationErrorResponse<T> = {
  error: ErrorResponse['error'] & ValidationError<T>;
};
