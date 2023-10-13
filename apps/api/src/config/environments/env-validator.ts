import { plainToClass } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { validateSync } from 'class-validator';
import { AppEnvEnum } from './constants/app-env.enum';
import { HostEnum } from './constants/host.enum';

export class EnvValidator {
  @IsEnum(AppEnvEnum)
  APP_ENV: AppEnvEnum;

  @IsEnum(HostEnum)
  HOST: HostEnum;

  @IsNumber()
  PORT: number;

  @IsNotEmpty()
  @IsString()
  DATABASE_URL: string;
}

/**
 * @param config バリデーション対象の Record<string, any>。今回は .env.development.local と 環境変数が合体したもの
 * @returns バリデーション済の Record<string, any>
 */
export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToClass(EnvValidator, config, {
    enableImplicitConversion: true,
  });

  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
}
