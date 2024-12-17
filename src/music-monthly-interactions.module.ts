import { Module } from '@nestjs/common';
import { MusicMonthlyInteractionsService } from './music-monthly-interactions.service';
import { MusicMonthlyInteractionsController } from './music-monthly-interactions.controller';

@Module({
  controllers: [MusicMonthlyInteractionsController],
  providers: [MusicMonthlyInteractionsService],
})
export class MusicMonthlyInteractionsModule {}
