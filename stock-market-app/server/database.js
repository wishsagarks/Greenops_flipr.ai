const mongoose = require('mongoose');

const db = 'mongodb+srv://freaking_wish:kiit@cluster0.mw8a7.mongodb.net/stocks?retryWrites=true&w=majority';

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Database Connected');
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDB;
