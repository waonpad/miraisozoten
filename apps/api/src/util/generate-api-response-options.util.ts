import { ApiResponseOptions } from '@nestjs/swagger';
import { z } from 'nestjs-zod/z';
import { generateSchema } from './generate-schema.util';

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
        schema: isArray ? { type: 'array', items: generateSchema(schema) } : generateSchema(schema),
      },
    },
  };
  return options;
};
