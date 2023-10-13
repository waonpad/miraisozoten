import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { WeaponAttribute } from '../constants/weapon-attribute.enum';

export class UpdateWeaponDto {
  // idはパスパラメータで渡すのでここには書かない

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  name: string;

  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  attackPower: number;

  @ApiProperty({ required: false, enum: WeaponAttribute })
  @IsEnum(WeaponAttribute)
  @IsOptional()
  attribute: WeaponAttribute;
}
