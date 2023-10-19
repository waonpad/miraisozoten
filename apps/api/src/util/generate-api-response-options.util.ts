import { ApiResponseOptions } from '@nestjs/swagger';
import { zodToOpenAPI } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

export const generateApiResponseOptions = ({
  schema,
  isArray,
}: {
  schema: z.ZodType<any>;
  isArray?: boolean;
}): ApiResponseOptions => {
  const options: ApiResponseOptions = {
    content: {
      'application/json; charset=utf-8': {
        schema: isArray ? { type: 'array', items: zodToOpenAPI(schema) } : zodToOpenAPI(schema),
      },
    },
  };
  return options;
};
