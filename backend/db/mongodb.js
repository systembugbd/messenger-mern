const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URI);
    if (connect) {
      console.log('Mongodb Database Connected Successfully');
    } else {
      console.log('Mongodb Database Not Connect');
    }
  } catch (error) {
    console.error(error.message);
  }
};

module.exports = connectDB;
