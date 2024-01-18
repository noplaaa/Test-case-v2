const { connectDB, disconnectDB } = require('../../config/database')
const models = require('../models/index')
const City = models.City

const generateData = () => {
  return [
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
  ].map(city => ({ cityId: city }));
};

const generateSeeder = async () => {
  try {
    await connectDB() // call function to conn DB
    await City.insertMany(generateData()) // seed data
    console.log('Seeders completed')
  } 
  catch (err) {
    console.error(`Error seeding data: ${err.message}`)
  } 
  finally {
    await disconnectDB() // call function to dc from DB
  }
}

module.exports = generateSeeder;