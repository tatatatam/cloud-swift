import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Music } from './scheme/musics.scheme';
import { MusicQueryDTO, RankQueryDTO } from 'src/dto/query-music.dto';
import { MusicMonthlyInteraction } from 'src/music-monthly-interactions/scheme/music-monthly-interactions.scheme';

@Injectable()
export class MusicsService {
  constructor(
    @InjectModel(Music.name) private musicModel: Model<Music>,
    @InjectModel(MusicMonthlyInteraction.name)
    private musicMonthlyInteractionModel: Model<MusicMonthlyInteraction>,
  ) {}

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

  async sumarizeMonthlyTrending() {
    const data = await this.musicMonthlyInteractionModel.aggregate([
      {
        $lookup: {
          from: 'musics', // Join with Musics collection
          localField: 'musicId',
          foreignField: '_id',
          as: 'musicDetails',
        },
      },
      { $unwind: '$musicDetails' }, // Unwind the joined data
      {
        $group: {
          _id: {
            month: { $dateToString: { format: '%Y-%m-01', date: '$date' } },
            // Group by the first day of each month
          },

          maxPlays: { $max: '$playsCount' },
          mostPlayedMusic: { $first: '$musicDetails' },
        },
      },
      {
        $sort: { '_id.year': 1, '_id.month': 1 }, // Sort by year and month
      },
    ]);

    return data;
  }
  async summarizeTrending() {
    const data = await this.musicMonthlyInteractionModel.aggregate([
      {
        $lookup: {
          from: 'musics',
          localField: 'musicId',
          foreignField: '_id',
          as: 'musicDetails',
        },
      },
      { $unwind: '$musicDetails' },
      {
        $group: {
          _id: '$musicDetails.album',
          totalPlays: { $sum: '$playsCount' },
        },
      },
      { $sort: { totalPlays: -1 } },
      { $limit: 1 },
    ]);
    return data;
  }

  async getMusicRanking(query: RankQueryDTO) {
    const { limit = 10 } = query;
    const data = await this.musicMonthlyInteractionModel.aggregate([
      {
        $lookup: {
          from: 'musics', // Join with Musics collection
          localField: 'musicId',
          foreignField: '_id',
          as: 'musicDetails',
        },
      },
      { $unwind: '$musicDetails' }, // Unwind the joined data
      {
        $group: {
          _id: {
            musicId: '$musicId',
          },
          totalPlays: { $sum: '$playsCount' }, // Sum playsCount for each music per month
          musicDetails: { $first: '$musicDetails' }, // Get music details
        },
      },
      { $sort: { '_id.month': 1, totalPlays: -1 } }, // Sort by month, then by totalPlays descending
      {
        $project: {
          _id: 0, // Exclude MongoDB's default _id
          month: '$_id.month',
          musicId: '$_id.musicId',
          totalPlays: 1,
          musicDetails: 1,
        },
      },
      { $limit: Number(limit) }, // Limit the result
    ]);
    return data;
  }
}
