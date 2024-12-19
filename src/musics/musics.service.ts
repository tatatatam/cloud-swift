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
    const count = await this.musicModel.countDocuments();

    return {
      data,
      pagination: {
        page,
        limit,
        total: count,
      },
    };
  }

  async sumarizeMonthlyTrending() {
    const data = await this.musicMonthlyInteractionModel.aggregate([
      {
        $lookup: {
          from: 'musics', // Join with Musics collection
          localField: 'musicId', // Link by musicId
          foreignField: '_id', // Match with _id in Musics
          as: 'musicDetails', // Output field for joined data
        },
      },
      { $unwind: '$musicDetails' }, // Flatten the musicDetails array
      {
        $group: {
          _id: {
            year: { $year: '$date' }, // Extract year from date
            month: { $month: '$date' }, // Extract month from date
          },
          mostPlays: { $max: '$playsCount' }, // Find max plays per month
          songs: {
            $push: {
              song: '$musicDetails.song',
              artist: '$musicDetails.artist',
              playsCount: '$playsCount',
            },
          },
        },
      },
      {
        $project: {
          _id: 1,
          mostPlays: 1,
          topSong: {
            $arrayElemAt: [
              {
                $filter: {
                  input: '$songs',
                  as: 'song',
                  cond: { $eq: ['$$song.playsCount', '$mostPlays'] },
                },
              },
              0,
            ],
          },
        },
      },
      {
        $project: {
          year: '$_id.year',
          month: '$_id.month',
          song: '$topSong.song',
          artist: '$topSong.artist',
          playsCount: '$mostPlays',
        },
      },
      { $sort: { year: 1, month: 1 } }, // Sort by year and month
    ]);

    return data;
  }
  async summarizeAlbumTrending() {
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
      {
        $project: {
          _id: 0,
          album: '$_id',
          totalPlays: 1,
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
