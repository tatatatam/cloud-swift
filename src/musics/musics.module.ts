import { Module } from '@nestjs/common';
import { MusicsService } from './musics.service';
import { MusicsController } from './musics.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { MusicSchema } from './scheme/musics.scheme';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Music', schema: MusicSchema }]),
  ],
  controllers: [MusicsController],
  providers: [MusicsService],
})
export class MusicsModule {}
