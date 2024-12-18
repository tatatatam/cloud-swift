// eslint-disable-next-line @typescript-eslint/no-require-imports
const MongoClient = require('mongodb').MongoClient;

// eslint-disable-next-line @typescript-eslint/no-require-imports
const seedData = require('./swift-cloud-17-12-2024.json');
// eslint-disable-next-line @typescript-eslint/no-require-imports
require('dotenv').config();
// MongoDB connection URI

const mongoUri = process.env.MONGODB_URI;
console.log(mongoUri);
const dbName = 'cloud-swift';
const collectionName = 'musics';

async function seedDatabase() {
  console.log('Seeding database...');
  // Connect to MongoDB
  const mongodbClient = await MongoClient.connect(mongoUri);

  const db = mongodbClient.db(dbName);
  db.createIndex('musics', {
    song: 'text',
    artist: 'text',
    year: 'text',
    album: 'text',
  });
  const dbMusicMonthly = db.collection('musicmonthlyinteractions');
  const collection = db.collection(collectionName);
  for (let i = 0; i < seedData.length; i++) {
    const songData = {
      song: seedData[i].Song,
      artist: seedData[i].Artist,
      writer: seedData[i].Writer,
      year: seedData[i].Year,
      album: seedData[i].Album,
    };
    const june = new Date('2024-06-01');
    const july = new Date('2024-07-01');
    const august = new Date('2024-08-01');
    // Insert the song data
    const musicData = await collection.insertOne(songData);
    const musicId = musicData.insertedId;
    await dbMusicMonthly.insertMany([
      {
        musicId,
        date: june,
        playsCount: seedData[i]['Plays - June'],
      },

      {
        musicId,
        date: july,
        playsCount: seedData[i]['Plays - July'],
      },

      {
        musicId,
        date: august,
        playsCount: seedData[i]['Plays - August'],
      },
    ]);
  }
  mongodbClient.close();
}

// Run the seeding function
seedDatabase();
