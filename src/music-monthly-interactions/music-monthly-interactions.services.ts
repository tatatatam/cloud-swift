import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MusicMonthlyInteraction } from 'src/music-monthly-interactions/scheme/music-monthly-interactions.scheme';

@Injectable()
export class MusicMonthlyInteractionService {
  constructor(
    @InjectModel(MusicMonthlyInteraction.name)
    private musicMonthlyInteractionModel: Model<MusicMonthlyInteraction>,
  ) {}

  findByMusicId(musicId: string) {
    return this.musicMonthlyInteractionModel.findOne({ musicId });
  }
}
