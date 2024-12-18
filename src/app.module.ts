import { Module } from '@nestjs/common';
import { MusicsModule } from './musics/musics.module';
import { MusicMonthlyInteractionsModule } from './music-monthly-interactions/music-monthly-interactions.module';
import { MongooseModule } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { ConfigModule } from '@nestjs/config';
mongoose.set('debug', true);
@Module({
  imports: [
    MusicsModule,
    MusicMonthlyInteractionsModule,
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGODB_URI),
  ],
})
export class AppModule {}
