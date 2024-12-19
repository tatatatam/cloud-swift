import { Controller, Get, Query } from '@nestjs/common';
import { MusicsService } from './musics.service';
import { MusicQueryDTO, RankQueryDTO } from 'src/dto/query-music.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Music } from '../entities/music.entity';
@Controller('musics')
export class MusicsController {
  constructor(private readonly musicsService: MusicsService) {}

  @ApiOperation({
    summary: 'Get all music',
    description: 'Get all music with optional search and pagination',
  })
  @Get()
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: Music,
  })
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
