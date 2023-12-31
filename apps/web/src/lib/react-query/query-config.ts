import { ErrorResponse } from 'react-router-dom';

import { DefaultOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { MutationErrorResponse } from '@/types';

export const queryConfig: DefaultOptions<AxiosError<ErrorResponse | MutationErrorResponse>> = {
  queries: {
    useErrorBoundary: true,
    refetchOnWindowFocus: false,
    retry: false,
    suspense: true,
  },
  mutations: {
    useErrorBoundary: (error: AxiosError<ErrorResponse | MutationErrorResponse>) => {
      // Custom error handling
      return error.response?.status !== 422;
    },
  },
};
