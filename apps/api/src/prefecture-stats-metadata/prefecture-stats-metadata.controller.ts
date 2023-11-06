import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';

import {
  PrefectureStatsMetadataResponse,
  PrefectureStatsMetadataResponseSchema,
  PrefectureStatsMetadataShema,
} from 'schema/dist/prefecture/stats/metadata';
import { generateApiResponseOptions } from 'src/util';
import { PrefectureStatsMetadataService } from './prefecture-stats-metadata.service';

@Controller('prefecture-stats-metadata')
@ApiTags('prefecture-stats-metadata')
export class PrefectureStatsMetadataController {
  constructor(private readonly prefectureStatsMetadataService: PrefectureStatsMetadataService) {}

  @Get('-schema-')
  @ApiOkResponse(generateApiResponseOptions({ schema: PrefectureStatsMetadataResponseSchema }))
  async openApiSchema(): Promise<void> {
    return Promise.reject(new NotFoundException());
  }

  @Get()
  @ApiOkResponse(
    generateApiResponseOptions({ schema: PrefectureStatsMetadataResponseSchema, isArray: true })
  )
  async getAllPrefectureStatsMetadata(): Promise<PrefectureStatsMetadataResponse[]> {
    return this.prefectureStatsMetadataService.getAllPrefectureStatsMetadata();
  }

  @Get('name/:name')
  @ApiParam({
    name: 'name',
    type: String,
    example: 'POPULATION',
  })
  @ApiOkResponse(generateApiResponseOptions({ schema: PrefectureStatsMetadataResponseSchema }))
  async getPrefectureStatsMetadataByName(
    @Param('name')
    name: string
  ): Promise<PrefectureStatsMetadataResponse | null> {
    // 簡易的にバリデーションを実装した
    const validatedName = PrefectureStatsMetadataShema.shape.name.parse(name);

    return this.prefectureStatsMetadataService.getPrefectureStatsMetadataByName(validatedName);
  }

  // 使わなさそう
  @Get(':id')
  @ApiParam({
    name: 'id',
    type: String,
    example: '1',
  })
  @ApiOkResponse(generateApiResponseOptions({ schema: PrefectureStatsMetadataResponseSchema }))
  async getPrefectureStatsMetadata(
    @Param('id')
    id: string
  ): Promise<PrefectureStatsMetadataResponse | null> {
    return this.prefectureStatsMetadataService.getPrefectureStatsMetadata(+id);
  }
}
