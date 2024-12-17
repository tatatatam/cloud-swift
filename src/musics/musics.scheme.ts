import { Schema, Document } from 'mongoose';

export interface Music extends Document {
  id: string;
  song: string;
  artist: string;
  writer: string[];
  album: string;
  year: string;
}

export const MusicSchema = new Schema<Music>({
  song: { type: String, required: true },
  artist: { type: String, required: true },
  writer: { type: [String], required: true },
  album: { type: String, required: true },
  year: { type: String, required: true },
});
