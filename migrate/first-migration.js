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
  console.log(mongodbClient);

  const db = mongodbClient.db(dbName);
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

    // Insert the song data
    await collection.insertOne(songData);
  }
  mongodbClient.close();
}

// Run the seeding function
seedDatabase();
