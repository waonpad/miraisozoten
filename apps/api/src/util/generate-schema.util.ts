import { OpenApiZodAny, generateSchema as generateOpenApiSchema } from '@anatine/zod-openapi';
import { SchemaObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';

export const generateSchema = (zodRef: OpenApiZodAny, useOutput?: boolean): SchemaObject => {
  return generateOpenApiSchema(zodRef, useOutput) as SchemaObject;
};
