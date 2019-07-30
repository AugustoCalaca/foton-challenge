const mongoose = require('mongoose');
const dotenv = require('dotenv');

const connect = _ => {
  return new Promise((resolve, reject) => {
    dotenv.config();

    mongoose.connect(process.env.MONGO_URI, {
      useFindAndModify: false,
      useCreateIndex: true,
      useNewUrlParser: true,
    });

    mongoose.connection.on('connected', _ => {
      console.log('[Mongoose] - Connected');
      resolve();
    });

    mongoose.connection.on('error', err => {
      console.log('[Mongoose] - Err');
      reject();
    });

    mongoose.connection.on('disconnected', _ => {
      console.log('[Mongoose] - Disconnected');
    });
  });
};

module.exports = connect;
