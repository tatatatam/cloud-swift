import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MusicMonthlyInteractionsService } from './music-monthly-interactions.service';
import { CreateMusicMonthlyInteractionDto } from './dto/create-music-monthly-interaction.dto';
import { UpdateMusicMonthlyInteractionDto } from './dto/update-music-monthly-interaction.dto';

@Controller('music-monthly-interactions')
export class MusicMonthlyInteractionsController {
  constructor(
    private readonly musicMonthlyInteractionsService: MusicMonthlyInteractionsService,
  ) {}

  @Post()
  create(
    @Body() createMusicMonthlyInteractionDto: CreateMusicMonthlyInteractionDto,
  ) {
    return this.musicMonthlyInteractionsService.create(
      createMusicMonthlyInteractionDto,
    );
  }

  @Get()
  findAll() {
    return this.musicMonthlyInteractionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.musicMonthlyInteractionsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateMusicMonthlyInteractionDto: UpdateMusicMonthlyInteractionDto,
  ) {
    return this.musicMonthlyInteractionsService.update(
      +id,
      updateMusicMonthlyInteractionDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.musicMonthlyInteractionsService.remove(+id);
  }
}
