import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsBoolean, IsNumber, IsOptional } from 'class-validator';

export class PageNumberPaginationOptionsDto {
  @ApiProperty({ required: false })
  @Transform(({ value }) => Number(value))
  @IsNumber()
  @IsOptional()
  page: number = 1;

  @ApiProperty({ required: false })
  @Transform(({ value }) => Number(value))
  @IsNumber()
  @IsOptional()
  limit: number = 10;

  @ApiProperty({ required: false })
  @Transform(({ value }) => value === 'true')
  @IsBoolean()
  @IsOptional()
  includePageCount: boolean = true;
}
