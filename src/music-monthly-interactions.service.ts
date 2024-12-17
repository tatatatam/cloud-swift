import { Injectable } from '@nestjs/common';
import { CreateMusicMonthlyInteractionDto } from './dto/create-music-monthly-interaction.dto';
import { UpdateMusicMonthlyInteractionDto } from './dto/update-music-monthly-interaction.dto';

@Injectable()
export class MusicMonthlyInteractionsService {
  create(createMusicMonthlyInteractionDto: CreateMusicMonthlyInteractionDto) {
    return 'This action adds a new musicMonthlyInteraction';
  }

  findAll() {
    return `This action returns all musicMonthlyInteractions`;
  }

  findOne(id: number) {
    return `This action returns a #${id} musicMonthlyInteraction`;
  }

  update(
    id: number,
    updateMusicMonthlyInteractionDto: UpdateMusicMonthlyInteractionDto,
  ) {
    return `This action updates a #${id} musicMonthlyInteraction`;
  }

  remove(id: number) {
    return `This action removes a #${id} musicMonthlyInteraction`;
  }
}
