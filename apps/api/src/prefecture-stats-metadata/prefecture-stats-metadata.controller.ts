import { Controller, Get, NotFoundException } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

import {
  PrefectureStatsMetadataResponse,
  PrefectureStatsMetadataResponseSchema,
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
}
