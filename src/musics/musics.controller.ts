import { Controller, Get, Query } from '@nestjs/common';
import { MusicsService } from './musics.service';
import { MusicQueryDTO } from 'src/dto/query-music.dto';

@Controller('musics')
export class MusicsController {
  constructor(private readonly musicsService: MusicsService) {}

  @Get()
  findAll(@Query() query: MusicQueryDTO) {
    return this.musicsService.findAll(query);
  }

  @Get('trending')
  summarizeTrending() {
    return this.musicsService.summarizeTrending();
  }

  @Get('monthly-trending')
  summarizeMonthlyTrending() {
    return this.musicsService.sumarizeMonthlyTrending();
  }
}
