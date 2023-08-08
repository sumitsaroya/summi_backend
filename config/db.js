const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    mongoose.set('strictQuery', false); // Set strictQuery to false
    await mongoose.connect(process.env.MONGO_URI);
    console.log(`Connected to MongoDB database at ${mongoose.connection.host}`);
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};

module.exports = connectDB;
