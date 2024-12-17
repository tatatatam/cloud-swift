import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MusicMonthlyInteractionSchema } from './music-monthly-interactions.scheme';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'MusicMonthlyInteraction',
        schema: MusicMonthlyInteractionSchema,
      },
    ]),
  ],
  exports: [MongooseModule],
})
export class MusicMonthlyInteractionsModule {}
