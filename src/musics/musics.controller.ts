import { Controller, Get, Query } from '@nestjs/common';
import { MusicsService } from './musics.service';
import { MusicQueryDTO, RankQueryDTO } from 'src/dto/query-music.dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller('musics')
export class MusicsController {
  constructor(private readonly musicsService: MusicsService) {}

  @ApiOperation({
    summary: 'Get all music',
    description: 'Get all music with optional search and pagination',
  })
  @Get()
  findAll(@Query() query: MusicQueryDTO) {
    return this.musicsService.findAll(query);
  }

  @ApiOperation({
    summary: 'Get the trending music',
    description: 'Get the trending music based on the number of interactions',
  })
  @Get('trending')
  summarizeTrending() {
    return this.musicsService.summarizeTrending();
  }

  @ApiOperation({
    summary: 'Get the monthly trending music',
    description:
      'Get the monthly trending music based on the number of interactions',
  })
  @Get('monthly-trending')
  summarizeMonthlyTrending() {
    return this.musicsService.sumarizeMonthlyTrending();
  }

  @ApiOperation({
    summary: 'Get the music ranking',
    description: 'Get the music ranking based on the number of interactions',
  })
  @Get('ranking')
  summarizeRanking(@Query() query: RankQueryDTO) {
    return this.musicsService.getMusicRanking(query);
  }
}
