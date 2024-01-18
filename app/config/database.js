const mongoose = require('mongoose')
const url = "mongodb://localhost:27017/test_case"

// connecting
const connectDB = async () => {
  try {
    await mongoose.connect(url, {});
    // console.log('Seeders connected');
  } catch (err) {
    console.error(`Error connecting to the database: ${err.message}`);
    throw err;
  }
}

// disconnecting
const disconnectDB = async () => {
  try {
    await mongoose.disconnect()
    // console.log('Seeders disconnected')
  } catch (err) {
    console.error(`Error disconnecting from the database: ${err.message}`)
    throw err;
  }
};

module.exports = {
  url,
  connectDB,
  disconnectDB
}