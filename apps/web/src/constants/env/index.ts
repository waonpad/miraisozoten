import { createEnv } from './createEnv';

export const env = createEnv({ runtimeEnv: import.meta.env });
