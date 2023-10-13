import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { WeaponAttribute } from '../constants/weapon-attribute.enum';

export class CreateWeaponDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  attackPower: number;

  @ApiProperty({ enum: WeaponAttribute })
  @IsNotEmpty()
  @IsEnum(WeaponAttribute)
  attribute: WeaponAttribute;
}
