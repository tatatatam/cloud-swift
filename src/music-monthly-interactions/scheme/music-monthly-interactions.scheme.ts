import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type MusicMonthlyInteractionDocument =
  HydratedDocument<MusicMonthlyInteraction>;

@Schema()
export class MusicMonthlyInteraction {
  @Prop()
  musicId: string;

  @Prop()
  playsCount: string;

  @Prop()
  date: Date;
}

export const MusicMonthlyInteractionSchema = SchemaFactory.createForClass(
  MusicMonthlyInteraction,
);
