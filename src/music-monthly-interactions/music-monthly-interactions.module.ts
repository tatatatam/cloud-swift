import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MusicMonthlyInteractionSchema } from './scheme/music-monthly-interactions.scheme';
import { MusicMonthlyInteractionsController } from './music-monthly-interactions.controller';
import { MusicMonthlyInteractionService } from './music-monthly-interactions.services';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'MusicMonthlyInteraction',
        schema: MusicMonthlyInteractionSchema,
      },
    ]),
  ],
  controllers: [MusicMonthlyInteractionsController],
  providers: [MusicMonthlyInteractionService],
})
export class MusicMonthlyInteractionsModule {}
