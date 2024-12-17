import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MusicSchema } from './musics.scheme';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Music', schema: MusicSchema }]),
  ],
  exports: [MongooseModule],
})
export class MusicsModule {}
