require('dotenv').config({ path: './.env' });
console.log("MONGO_URI:", process.env.MONGO_URI);

const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, { serverSelectionTimeoutMS: 5000 })
  .then(() => {
    console.log("Connected to MongoDB successfully!");
    mongoose.connection.close();
  })
  .catch(err => {
    console.error("Connection error:", err);
  });