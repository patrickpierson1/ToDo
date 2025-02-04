const mongoose = require('mongoose');
require('dotenv').config();
const connectDB = require('../config/db');

connectDB();

const migrate = async () => {
  try {
    const db = mongoose.connection.db;
    await db.collection('users').createIndex({ email: 1 }, { unique: true });
    console.log('Indexes added!');
    mongoose.disconnect();
  } catch (error) {
    console.error('Migration failed:', error);
    mongoose.disconnect();
  }
};

migrate();
