import { Module } from '@nestjs/common';
import { MusicsService } from './musics.service';
import { MusicsController } from './musics.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { MusicSchema } from './scheme/musics.scheme';
import { MusicMonthlyInteractionsModule } from 'src/music-monthly-interactions/music-monthly-interactions.module';
import { MusicMonthlyInteractionSchema } from 'src/music-monthly-interactions/scheme/music-monthly-interactions.scheme';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Music', schema: MusicSchema },
      {
        name: 'MusicMonthlyInteraction',
        schema: MusicMonthlyInteractionSchema,
      },
    ]),
    MusicMonthlyInteractionsModule,
  ],
  controllers: [MusicsController],
  providers: [MusicsService],
})
export class MusicsModule {}
