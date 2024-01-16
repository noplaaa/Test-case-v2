const mongoose = require('mongoose')

const url = "mongodb://localhost:27017/test_case"

const connectDB = async () => {
  try {
    await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Seeders connected');
  } catch (error) {
    console.error(`Error connecting to the database: ${error.message}`);
    throw error;
  }
}

const disconnectDB = async () => {
  try {
    await mongoose.disconnect()
    console.log('Seeders disconnected')
  } catch (error) {
    console.error(`Error disconnecting from the database: ${error.message}`)
    throw error;
  }
};

module.exports = {
  url,
  connectDB,
  disconnectDB
}