import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type MusicDocument = HydratedDocument<Music>;

@Schema()
export class Music {
  @Prop()
  song: string;

  @Prop()
  artist: string;

  @Prop()
  writer: string[];

  @Prop()
  album: string;

  @Prop()
  year: string;
}

export const MusicSchema = SchemaFactory.createForClass(Music);
