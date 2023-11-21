import { createEnv } from './create-env';

export const env = createEnv({ runtimeEnv: import.meta.env });
