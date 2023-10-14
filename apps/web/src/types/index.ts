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
