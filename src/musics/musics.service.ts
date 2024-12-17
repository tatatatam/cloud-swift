import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Music } from './scheme/musics.scheme';
import { MusicQueryDTO } from 'src/dto/query-music.dto';

@Injectable()
export class MusicsService {
  constructor(@InjectModel(Music.name) private musicModel: Model<Music>) {}

  async findAll(query?: MusicQueryDTO) {
    const { search, page = 1, limit = 10 } = query;
    const filter = {};
    if (search) {
      filter['$text'] = {
        $search: search,
      };
    }

    const data = await this.musicModel
      .find(filter)
      .skip((page - 1) * limit)
      .limit(limit);

    return data;
  }

  async summarizeTrending() {
    return this.musicModel.aggregate([
      {
        $group: {
          _id: '$musicId',
          total: { $sum: 1 },
        },
      },
      {
        $sort: { total: -1 },
      },
      {
        $limit: 10,
      },
    ]);
  }
}
