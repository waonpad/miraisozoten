import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Response } from 'express';
import { ZodValidationException } from 'nestjs-zod';

@Catch(ZodValidationException)
export class ZodValidationExceptionFilter implements ExceptionFilter {
  catch(exception: ZodValidationException, host: ArgumentsHost) {
    // const zodError = exception.getZodError();

    // Custom error handling

    const response = host.switchToHttp().getResponse<Response>();

    response.status(422).json(exception.getResponse());
  }
}
