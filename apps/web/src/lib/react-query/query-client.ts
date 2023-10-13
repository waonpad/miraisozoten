import { QueryClient } from '@tanstack/react-query';

import { queryConfig } from './query-config';

import type { DefaultOptions } from '@tanstack/react-query';

export const queryClient = new QueryClient({ defaultOptions: queryConfig as DefaultOptions });
