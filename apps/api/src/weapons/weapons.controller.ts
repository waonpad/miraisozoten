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
  UseGuards,
} from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { zodToOpenAPI } from 'nestjs-zod';
import { PageNumberPagination } from 'prisma-extension-pagination/dist/types';
import {
  PageNumberPaginationOptionsDto,
  PageNumberPaginationOptionsSchema,
} from 'schema/dist/common/pagination';
import {
  CreateWeaponInputDto,
  CreateWeaponInputSchema,
  UpdateWeaponInputDto,
  UpdateWeaponInputSchema,
  WeaponResponse,
  WeaponResponseSchema,
} from 'schema/dist/weapon';
import { AuthGuard } from 'src/auth/auth.guard';
import { WeaponsService } from './weapons.service';

@Controller('weapons')
@ApiTags('weapons') // swagger用のタグを追加
export class WeaponsController {
  constructor(private readonly weaponsService: WeaponsService) {}

  @Get()
  @HttpCode(200)
  @ApiOkResponse({
    schema: zodToOpenAPI(WeaponResponseSchema),
  })
  async getAllWeapons(): Promise<WeaponResponse[]> {
    return this.weaponsService.getAllWeapons();
  }

  // :id より上に書かないと:idがpagesとして扱われてしまう
  @Get('pages')
  @ApiQuery({
    schema: zodToOpenAPI(PageNumberPaginationOptionsSchema),
  })
  @ApiOkResponse({
    schema: zodToOpenAPI(WeaponResponseSchema),
  })
  @HttpCode(200)
  async getAllWeaponsWithPages(
    @Query() options: PageNumberPaginationOptionsDto
  ): Promise<[WeaponResponse[], PageNumberPagination]> {
    // throw new Error('Not implemented');

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
  ): Promise<WeaponResponse | null> {
    return this.weaponsService.getWeapon(+id);
  }

  @UseGuards(AuthGuard)
  @Post()
  @ApiBody({
    schema: zodToOpenAPI(CreateWeaponInputSchema),
  })
  @ApiOkResponse({
    schema: zodToOpenAPI(WeaponResponseSchema),
  })
  async create(
    @Body()
    createWeaponInputDto: CreateWeaponInputDto
  ): Promise<WeaponResponse> {
    return this.weaponsService.createWeapon(createWeaponInputDto);
  }

  @Put(':id')
  @ApiParam({
    name: 'id',
    type: Number,
    example: 1,
  })
  @ApiBody({
    schema: zodToOpenAPI(UpdateWeaponInputSchema),
  })
  @ApiOkResponse({
    schema: zodToOpenAPI(WeaponResponseSchema),
  })
  @UseGuards(AuthGuard)
  async update(
    @Param('id')
    id: string,
    @Body()
    updateWeaponInputDto: UpdateWeaponInputDto
  ): Promise<WeaponResponse> {
    return this.weaponsService.updateWeapon(+id, updateWeaponInputDto);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: Number,
    example: 1,
  })
  @ApiOkResponse({
    schema: zodToOpenAPI(WeaponResponseSchema),
  })
  @UseGuards(AuthGuard)
  async delete(
    @Param('id')
    id: string
  ): Promise<WeaponResponse> {
    return this.weaponsService.deleteWeapon(+id);
  }
}
