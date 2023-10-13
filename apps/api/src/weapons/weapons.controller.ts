import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { Weapon } from 'database';
import { Request } from 'express';
import { PageNumberPagination } from 'prisma-extension-pagination/dist/types';
import { AuthGuard } from 'src/auth/auth.guard';
import { PageNumberPaginationOptionsDto } from 'src/common/dto/page-number-pagination-options.dto';
import { JwtDecodedUser } from 'src/user/jwt-decoded-user';
import { User } from 'src/user/user.decorator';
import { CreateWeaponDto } from './dto/create-weapon.dto';
import { UpdateWeaponDto } from './dto/update-weapon.dto';
import { WeaponsService } from './weapons.service';

@Controller('weapons')
@ApiTags('weapons') // swagger用のタグを追加
export class WeaponsController {
  constructor(private readonly weaponsService: WeaponsService) {}

  @Get()
  @HttpCode(200)
  // @UseGuards(AuthGuard)
  // @Api〇〇() でswagger用のタグをいろいろつけられる
  async getAllWeapons(): Promise<Weapon[]> {
    return this.weaponsService.getAllWeapons();
  }

  // :id より上に書かないと:idがpagesとして扱われてしまう
  @Get('pages')
  @HttpCode(200)
  async getAllWeaponsWithPages(
    @Query() options: PageNumberPaginationOptionsDto
  ): Promise<[Weapon[], PageNumberPagination]> {
    console.log(options);

    return this.weaponsService.getAllWeaponsWithPages(options);
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    type: Number,
    example: 1,
  }) // exampleをつけないとdreddに怒られた
  async getWeapon(
    @Param('id')
    id: string
  ): Promise<Weapon> {
    return this.weaponsService.getWeapon(+id);
  }

  @UseGuards(AuthGuard)
  @Post()
  async create(
    @Body()
    createWeaponDto: CreateWeaponDto,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    @Req() request: Request, // NextAuthで認証したユーザー情報を取得する
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    @User() user: JwtDecodedUser
  ): Promise<Weapon> {
    // console.log(request);
    // console.log(user);

    return this.weaponsService.createWeapon(createWeaponDto);
  }

  @Put(':id')
  @ApiParam({
    name: 'id',
    type: Number,
    example: 1,
  })
  @UseGuards(AuthGuard)
  async update(
    @Param('id')
    id: string,
    @Body()
    updateWeaponDto: UpdateWeaponDto
  ): Promise<Weapon> {
    return this.weaponsService.updateWeapon(+id, updateWeaponDto);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: Number,
    example: 1,
  })
  @UseGuards(AuthGuard)
  async delete(
    @Param('id')
    id: string
  ): Promise<Weapon> {
    return this.weaponsService.deleteWeapon(+id);
  }
}
