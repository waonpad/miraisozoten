import { Injectable, LoggerService as LoggerServiceOrigin } from '@nestjs/common';
import { Env } from 'src/config/environments/env.service';
import { createLogger, format, Logger, transports } from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';

@Injectable()
export class LoggerService implements LoggerServiceOrigin {
  logger: Logger;

  constructor(private env: Env) {
    // infoログ（通常ログ）の出力先を定義
    const applicationLogTransport: DailyRotateFile = new DailyRotateFile({
      level: 'info',
      filename: 'application-%DATE%.log',
      dirname: 'logs/application',
      datePattern: 'YYYYMMDD',
      maxFiles: '7d',
    });

    // errorログの出力先を定義
    const errorLogTransport: DailyRotateFile = new DailyRotateFile({
      level: 'error',
      filename: 'error-%DATE%.log',
      dirname: 'logs/error',
      datePattern: 'YYYYMMDD',
      maxFiles: '7d',
    });

    this.logger = createLogger({
      level: 'info',
      format: format.combine(
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        format.errors({ stack: true }), // errorログではstackを表示
        format.splat(),
        format.json()
      ),
      defaultMeta: { service: 'logging', funcName: '' }, // デフォルトの出力項目を指定
      transports: [applicationLogTransport, errorLogTransport],
    });

    // envでログをコンソール出力するか決定する
    if (!this.env.isProduction()) {
      this.logger.add(
        new transports.Console({
          level: 'debug',
          format: format.combine(format.colorize(), format.simple()),
        })
      );
    }
  }

  log(message: string): void {
    this.logger.info(message);
  }

  error(message: string, err: Error, service: string, funcName: string): void {
    this.logger.error(message, err, {
      service: service,
      funcName: funcName,
    });
  }

  warn(message: string): void {
    this.logger.warn(message);
  }
}
