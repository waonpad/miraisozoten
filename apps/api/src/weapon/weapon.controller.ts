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
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { zodToOpenAPI } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';
import {
  PageNumberPaginationMeta,
  PageNumberPaginationMetaResponseSchema,
  PageNumberPaginationOptionsDto,
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
import { generateApiResponseOptions } from 'src/util';
import { WeaponService } from './weapon.service';

@Controller('weapons')
@ApiTags('weapons')
export class WeaponController {
  constructor(private readonly weaponService: WeaponService) {}

  @Get()
  @ApiOkResponse(generateApiResponseOptions({ schema: WeaponResponseSchema, isArray: true }))
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
  @ApiOkResponse(
    generateApiResponseOptions({
      schema: z.tuple([z.array(WeaponResponseSchema), PageNumberPaginationMetaResponseSchema]),
    })
  )
  async getAllWeaponWithPages(
    @Query() options: PageNumberPaginationOptionsDto
  ): Promise<[WeaponResponse[], PageNumberPaginationMeta]> {
    return this.weaponService.getAllWeaponWithPages(options);
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    type: String,
    example: '1',
  })
  @ApiOkResponse(generateApiResponseOptions({ schema: WeaponResponseSchema }))
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
  @ApiCreatedResponse(generateApiResponseOptions({ schema: WeaponResponseSchema }))
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
  @ApiOkResponse(generateApiResponseOptions({ schema: WeaponResponseSchema }))
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
  @ApiOkResponse(generateApiResponseOptions({ schema: WeaponResponseSchema }))
  async delete(
    @Param('id')
    id: string
  ): Promise<WeaponResponse> {
    return this.weaponService.deleteWeapon(Number(id));
  }
}
