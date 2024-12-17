import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MusicMonthlyInteractionSchema } from './scheme/music-monthly-interactions.scheme';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'MusicMonthlyInteraction',
        schema: MusicMonthlyInteractionSchema,
      },
    ]),
  ],
})
export class MusicMonthlyInteractionsModule {}
