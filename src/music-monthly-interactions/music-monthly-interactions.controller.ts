import { Controller, Get, Param } from '@nestjs/common';
import { MusicMonthlyInteractionService } from './music-monthly-interactions.services';

@Controller()
export class MusicMonthlyInteractionsController {
  constructor(
    private readonly musicMonthlyInteractionService: MusicMonthlyInteractionService,
  ) {}

  @Get(':id')
  findById(@Param() id) {
    return this.musicMonthlyInteractionService.findByMusicId(id);
  }
}
