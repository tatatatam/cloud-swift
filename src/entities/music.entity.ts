class MusicDTO {
  _id: string;
  song: string;
  artist: string;
  writer: string[];
  album: string;
  year: string;
}
export class Music {
  data: MusicDTO[];
  pagination: {
    page: number;
    limit: number;
    total: number;
  };
}
