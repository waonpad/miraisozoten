import { Transform } from 'class-transformer';
import { IsBoolean, IsNumber } from 'class-validator';

export class PageNumberPaginationOptionsDto {
  @IsNumber()
  @Transform(({ value }) => Number(value))
  page: number;

  @IsNumber()
  @Transform(({ value }) => Number(value))
  limit: number;

  @IsBoolean()
  @Transform(({ value }) => value === 'true')
  includePageCount: boolean;
}
