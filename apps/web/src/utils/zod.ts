/* eslint-disable @typescript-eslint/no-explicit-any */
import { UseMutationResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { MutationErrorResponse } from '@/types';

export const zodIssue = (
  path: string[],
  useMutationResult: UseMutationResult<
    any,
    AxiosError<MutationErrorResponse, any>,
    {
      data: any;
    },
    any
  >
) => {
  return useMutationResult.error?.response?.data.errors.filter(
    (error) => error.path.join('.') === path.join('.')
  )[0];
};
