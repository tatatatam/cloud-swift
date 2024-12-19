import { Controller, Get, Param } from '@nestjs/common';
import { MusicMonthlyInteractionService } from './music-monthly-interactions.services';
import { ApiOperation } from '@nestjs/swagger';
import { FindByIdDTO } from 'src/dto/query-music-monthly-interaction.dto';

@Controller('musics-interactions')
export class MusicMonthlyInteractionsController {
  constructor(
    private readonly musicMonthlyInteractionService: MusicMonthlyInteractionService,
  ) {}

  @ApiOperation({
    summary: 'Get monthly interactions by music id',
    description: 'Get monthly interactions by music id',
  })
  @Get('/monthly/:id')
  findById(@Param() query: FindByIdDTO) {
    return this.musicMonthlyInteractionService.findByMusicId(query);
  }
}
