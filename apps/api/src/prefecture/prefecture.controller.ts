import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';

import { PrefectureResponse, PrefectureResponseSchema } from 'schema/dist/prefecture';
import {
  PrefectureStatsResponse,
  PrefectureStatsResponseSchema,
} from 'schema/dist/prefecture/stats';
import { generateApiResponseOptions } from 'src/util';
import { PrefectureService } from './prefecture.service';

@Controller('prefectures')
@ApiTags('prefectures')
export class PrefectureController {
  constructor(private readonly prefectureService: PrefectureService) {}

  @Get('-schema-')
  @ApiOkResponse(generateApiResponseOptions({ schema: PrefectureResponseSchema }))
  async openApiSchema(): Promise<void> {
    return Promise.reject(new NotFoundException());
  }

  @Get()
  @ApiOkResponse(generateApiResponseOptions({ schema: PrefectureResponseSchema, isArray: true }))
  async getAllPrefecture(): Promise<PrefectureResponse[]> {
    return this.prefectureService.getAllPrefecture();
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    type: String,
    example: '1',
  })
  @ApiOkResponse(generateApiResponseOptions({ schema: PrefectureResponseSchema }))
  async getPrefecture(
    @Param('id')
    id: string
  ): Promise<PrefectureResponse | null> {
    return this.prefectureService.getPrefecture(+id);
  }

  @Get(':id/stats')
  @ApiParam({
    name: 'id',
    type: String,
    example: '1',
  })
  @ApiOkResponse(generateApiResponseOptions({ schema: PrefectureStatsResponseSchema }))
  async getPrefectureStats(@Param('id') id: string): Promise<PrefectureStatsResponse | null> {
    return this.prefectureService.getPrefectureStats(+id);
  }

  @Get(':id/neighbors')
  @ApiParam({
    name: 'id',
    type: String,
    example: '1',
  })
  @ApiOkResponse(generateApiResponseOptions({ schema: PrefectureResponseSchema, isArray: true }))
  async getPrefectureNeighbors(@Param('id') id: string): Promise<PrefectureResponse[] | null> {
    return this.prefectureService.getPrefectureNeighbors(+id);
  }
}
