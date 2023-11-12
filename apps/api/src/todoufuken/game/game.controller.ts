import {
  Body,
  Controller,
  Get,
  NotFoundException,
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
  ApiTags,
  ApiQuery,
} from '@nestjs/swagger';

import { z } from 'nestjs-zod/z';
import { PageNumberPaginationMeta } from 'prisma-extension-pagination';
import { PageNumberPaginationMetaResponseSchema } from 'schema/dist/common/pagination';
import {
  CreateGameInputDto,
  CreateGameInputSchema,
  UpdateGameInputDto,
  UpdateGameInputSchema,
  GameResponse,
  GameResponseSchema,
  GetGamesQueryDto,
} from 'schema/dist/todoufuken/game';
import {
  CreateGameLogInputDto,
  CreateGameLogInputSchema,
  GameLogResponse,
} from 'schema/dist/todoufuken/game/log';
import { JwtDecodedUser } from 'schema/dist/user';
import { AuthGuard } from 'src/auth/auth.guard';
import { User } from 'src/user/user.decorator';
import { generateSchema, generateApiResponseOptions } from 'src/util';
import { GameService } from './game.service';

@Controller('games')
@ApiTags('games')
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @Get('-schema-')
  @ApiOkResponse(generateApiResponseOptions({ schema: GameResponseSchema }))
  async openApiSchema(): Promise<void> {
    return Promise.reject(new NotFoundException());
  }

  @Get()
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
    name: 'state',
    type: String,
    example: 'PLAYING',
  })
  @ApiQuery({
    name: 'difficulty',
    type: String,
    example: 'EASY',
  })
  @ApiQuery({
    name: 'mode',
    type: String,
    example: 'NATIONWIDE',
  })
  @ApiQuery({
    name: 'userId',
    type: String,
    example: 'uuid-uuid-uuid-uuid',
  })
  @ApiOkResponse(
    generateApiResponseOptions({
      schema: z.tuple([z.array(GameResponseSchema), PageNumberPaginationMetaResponseSchema]),
    })
  )
  async getAllGame(
    @Query() query: GetGamesQueryDto
  ): Promise<[GameResponse[], PageNumberPaginationMeta]> {
    return this.gameService.getAllGame(query);
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  @ApiParam({
    name: 'id',
    type: String,
    example: 'uuid-uuid-uuid-uuid',
  })
  @ApiOkResponse(generateApiResponseOptions({ schema: GameResponseSchema }))
  async getGame(
    @Param('id')
    id: string,
    @User()
    user: JwtDecodedUser
  ): Promise<GameResponse | null> {
    return this.gameService.getGame(id, user);
  }

  @Post()
  @UseGuards(AuthGuard)
  @ApiBody({
    schema: generateSchema(CreateGameInputSchema),
  })
  @ApiCreatedResponse(generateApiResponseOptions({ schema: GameResponseSchema }))
  async create(
    @Body()
    createGameInputDto: CreateGameInputDto,
    @User()
    user: JwtDecodedUser
  ): Promise<GameResponse> {
    return this.gameService.createGame(createGameInputDto, user);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  @ApiParam({
    name: 'id',
    type: String,
    example: 'uuid-uuid-uuid-uuid',
  })
  @ApiBody({
    schema: generateSchema(UpdateGameInputSchema),
  })
  @ApiOkResponse(generateApiResponseOptions({ schema: GameResponseSchema }))
  async update(
    @Param('id')
    id: string,
    @Body()
    updateGameInputDto: UpdateGameInputDto,
    @User()
    user: JwtDecodedUser
  ): Promise<GameResponse> {
    return this.gameService.updateGame(id, updateGameInputDto, user);
  }

  // 別の方法でもログを書かないといけない可能性があるので、Dtoを複数作った方がよさそう
  @Post(':id/logging/turn-action')
  @UseGuards(AuthGuard)
  @ApiParam({
    name: 'id',
    type: String,
    example: 'uuid-uuid-uuid-uuid',
  })
  @ApiBody({
    schema: generateSchema(CreateGameLogInputSchema),
  })
  @ApiOkResponse(generateApiResponseOptions({ schema: GameResponseSchema }))
  async loggingTurnAction(
    @Param('id')
    id: string,
    @Body()
    createGameLogInputDto: CreateGameLogInputDto,
    @User()
    user: JwtDecodedUser
  ): Promise<GameLogResponse> {
    return this.gameService.submitGameTurnAction(id, createGameLogInputDto, user);
  }

  @Patch(':id/give-up')
  @UseGuards(AuthGuard)
  @ApiParam({
    name: 'id',
    type: String,
    example: 'uuid-uuid-uuid-uuid',
  })
  @ApiOkResponse(generateApiResponseOptions({ schema: GameResponseSchema }))
  async giveUp(
    @Param('id')
    id: string,
    @User()
    user: JwtDecodedUser
  ): Promise<GameResponse> {
    return this.gameService.giveUpGame(id, user);
  }
}
