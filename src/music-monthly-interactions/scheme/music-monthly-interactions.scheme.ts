import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes } from 'mongoose';
import { Music } from 'src/musics/scheme/musics.scheme';

export type MusicMonthlyInteractionDocument =
  HydratedDocument<MusicMonthlyInteraction>;

@Schema()
export class MusicMonthlyInteraction {
  @Prop({ type: SchemaTypes.ObjectId, ref: Music.name })
  musicId: string;

  @Prop()
  playsCount: string;

  @Prop()
  date: Date;
}

export const MusicMonthlyInteractionSchema = SchemaFactory.createForClass(
  MusicMonthlyInteraction,
);
