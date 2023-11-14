import { Controller, Get, NotFoundException } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { PrefectureResponse, PrefectureResponseSchema } from 'schema/dist/prefecture';

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
}
