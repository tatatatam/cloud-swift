import { Schema, Document } from 'mongoose';

export interface MusicMonthlyInteraction extends Document {
  id: string;
  musicId: string;
  playsCount: number;
  month: Date;
}

export const MusicMonthlyInteractionSchema =
  new Schema<MusicMonthlyInteraction>({
    musicId: { type: String, required: true },
    playsCount: { type: Number, required: true },
    month: { type: Date, required: true },
  });
