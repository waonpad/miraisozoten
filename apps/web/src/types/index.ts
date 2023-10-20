export type ErrorResponse = {
  statusCode: number;
  message: string;
};

export type ValidationError<T> = {
  code: string;
  message: string;
  path: (string | number)[];
  validation: keyof T;
}[];

export type MutationErrorResponse<T> = ErrorResponse & {
  errors: ValidationError<T>;
};
