// eslint-disable-next-line @typescript-eslint/no-require-imports
var MongoClient = require('mongodb').MongoClient;
// eslint-disable-next-line @typescript-eslint/no-require-imports
var seedData = require('./swift-cloud-17-12-2024.json');

// MongoDB connection URI
var mongoUri = 'mongodb://localhost:27017';
var dbName = 'cloud-swift';
var collectionName = 'musics';

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
  console.log(seedData);
  for (let i = 0; i < seedData.length; i++) {
    var songData = {
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
