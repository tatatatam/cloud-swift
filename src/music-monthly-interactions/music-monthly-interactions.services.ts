import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { FindByIdDTO } from 'src/dto/query-music-monthly-interaction.dto';
import { MusicMonthlyInteraction } from 'src/music-monthly-interactions/scheme/music-monthly-interactions.scheme';

@Injectable()
export class MusicMonthlyInteractionService {
  constructor(
    @InjectModel(MusicMonthlyInteraction.name)
    private musicMonthlyInteractionModel: Model<MusicMonthlyInteraction>,
  ) {}

  findByMusicId(query: FindByIdDTO) {
    const { id: musicId } = query;
    return this.musicMonthlyInteractionModel.find({
      musicId: new Types.ObjectId(musicId),
    });
  }
}
