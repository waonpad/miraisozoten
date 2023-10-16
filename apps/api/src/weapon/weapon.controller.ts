import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBody,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { zodToOpenAPI } from 'nestjs-zod';
import { PageNumberPagination } from 'prisma-extension-pagination/dist/types';
import { PageNumberPaginationOptionsDto } from 'schema/dist/common/pagination';
import {
  CreateWeaponInputDto,
  CreateWeaponInputSchema,
  UpdateWeaponInputDto,
  UpdateWeaponInputSchema,
  WeaponResponse,
  WeaponResponseSchema,
} from 'schema/dist/weapon';
import { AuthGuard } from 'src/auth/auth.guard';
import { WeaponService } from './weapon.service';

@Controller('weapons')
@ApiTags('weapons')
export class WeaponController {
  constructor(private readonly weaponService: WeaponService) {}

  @Get()
  @ApiOkResponse({
    schema: zodToOpenAPI(WeaponResponseSchema),
  })
  async getAllWeapon(): Promise<WeaponResponse[]> {
    return this.weaponService.getAllWeapon();
  }

  @Get('pages')
  @ApiQuery({
    name: 'page',
    type: String,
    example: '1',
  })
  @ApiQuery({
    name: 'limit',
    type: String,
    example: '10',
  })
  @ApiQuery({
    name: 'includePageCount',
    type: String,
    example: 'true',
  })
  @ApiOkResponse({
    schema: zodToOpenAPI(WeaponResponseSchema),
  })
  async getAllWeaponWithPages(
    @Query() options: PageNumberPaginationOptionsDto
  ): Promise<[WeaponResponse[], PageNumberPagination]> {
    return this.weaponService.getAllWeaponWithPages(options);
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    type: String,
    example: '1',
  })
  async getWeapon(
    @Param('id')
    id: string
  ): Promise<WeaponResponse | null> {
    return this.weaponService.getWeapon(Number(id));
  }

  @Post()
  @UseGuards(AuthGuard)
  @ApiBody({
    schema: zodToOpenAPI(CreateWeaponInputSchema),
  })
  @ApiCreatedResponse({
    schema: zodToOpenAPI(WeaponResponseSchema),
  })
  async create(
    @Body()
    createWeaponInputDto: CreateWeaponInputDto
  ): Promise<WeaponResponse> {
    return this.weaponService.createWeapon(createWeaponInputDto);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  @ApiParam({
    name: 'id',
    type: Number,
    example: '1',
  })
  @ApiBody({
    schema: zodToOpenAPI(UpdateWeaponInputSchema),
  })
  @ApiOkResponse({
    schema: zodToOpenAPI(WeaponResponseSchema),
  })
  async update(
    @Param('id')
    id: string,
    @Body()
    updateWeaponInputDto: UpdateWeaponInputDto
  ): Promise<WeaponResponse> {
    return this.weaponService.updateWeapon(Number(id), updateWeaponInputDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @ApiParam({
    name: 'id',
    type: String,
    example: '1',
  })
  @ApiNoContentResponse({
    schema: zodToOpenAPI(WeaponResponseSchema),
  })
  async delete(
    @Param('id')
    id: string
  ): Promise<WeaponResponse> {
    return this.weaponService.deleteWeapon(Number(id));
  }
}
