// city.seeder.js
const connectDB = require('../config/database').connectDB;
const disconnectDB = require('../config/database').disconnectDB;
const City = require('../src/models/city.model.js');

const citySeeders = async () => {
  try {
    await connectDB(); // Connect to the database

    // Clear existing data
    await City.deleteMany();

    // Seed data
    const cities = [
      'Aceh',
      'Ambon',
      'Bandung',
      'Bekasi',
      'Bali',
      'Banten',
      'Banjarmasin',
      'Cimahi',
      'Depok',
      'Denpasar',
      'Garut',
      'Gorontalo',
      'Jambi',
      'Jakarta',
      'Kudus',
      'Kupang',
      'Makassar',
      'Manado',
      'Mamuju',
      'Madiun',
      'Malang',
      'Medan',
      'NTB',
      'NTT',
      'Padang',
      'Palu',
      'Papua',
      'Pontianak',
      'Sidoarjo',
      'Subang',
      'Solo',
      'Semarang',
      'Surabaya',
      'Serang',
      'Tangerang',
      'Tasikmalaya',
      'Yogyakarta',
    ];

    const citiesData = cities.map(city => ({ cityId: city }));
    await City.insertMany(citiesData);

    console.log('Seeders completed');
  } catch (err) {
    console.error(`Error seeding data: ${err.message}`);
  } finally {
    await disconnectDB(); // Disconnect from the database
  }
};

module.exports = citySeeders;