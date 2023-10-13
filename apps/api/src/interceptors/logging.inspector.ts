import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Request } from 'express';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { LoggerService } from 'src/logger/logger.service';

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  constructor(
    private readonly accessLogger: LoggerService,
    private readonly errorLogger: LoggerService
  ) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest<Request>();
    const requestData = {
      ip: request.ip,
      method: request.method,
      url: request.url,
      body: request.body || {},
    };

    this.accessLogger.log(JSON.stringify(requestData));

    return next
      .handle()
      .pipe(
        catchError((err: Error) => {
          this.errorLogger.error(err.message, err, 'LoggerInterceptor', 'intercept');
          return throwError(() => err);
        })
      )
      .pipe(tap());
  }
}
