import { Module } from '@nestjs/common';
import { MusicsModule } from './musics/musics.module';
import { MusicMonthlyInteractionsModule } from './music-monthly-interactions/music-monthly-interactions.module';
import { MongooseModule } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

mongoose.set('debug', true);
@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/cloud-swift'),
    MusicsModule,
    MusicMonthlyInteractionsModule,
  ],
})
export class AppModule {}
