import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiCreatedResponse, ApiParam, ApiTags } from '@nestjs/swagger';

import {
  CreateGameInputDto,
  CreateGameInputSchema,
  UpdateGameInputDto,
  UpdateGameInputSchema,
  GameResponse,
  GameResponseSchema,
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

  // メソッド名を後でいい感じにする
  // 別の方法でもログを書かないといけない可能性があるので、Dtoを複数作った方がよさそう
  @Post(':id/logging/turn-act')
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
  async loggingTurnAct(
    @Param('id')
    id: string,
    @Body()
    createGameLogInputDto: CreateGameLogInputDto,
    @User()
    user: JwtDecodedUser
  ): Promise<GameLogResponse> {
    return this.gameService.submitGameTurnAct(id, createGameLogInputDto, user);
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
