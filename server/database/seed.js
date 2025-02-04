// This file creates test information to fill the db with.
// It is ran manually with 'node server/database/seed.js'

const mongoose = require('mongoose');
const User = require('../models/User');
const Note = require('../models/Note');
require('dotenv').config();
const connectDB = require('../config/db');

connectDB();

const seedDatabase = async () => {
  try {
    await User.deleteMany();
    await Note.deleteMany();

    const user = await User.create({
      username: 'testuser',
      email: 'test@example.com',
      password: 'password123',
    });

    await Note.create([
      { userId: user._id, title: 'First Note', content: 'This is a sample note.' },
      { userId: user._id, title: 'Second Note', content: 'Another example note.' },
    ]);

    console.log('Database seeded!');
    mongoose.disconnect();
  } catch (error) {
    console.error('Seeding failed:', error);
    mongoose.disconnect();
  }
};

seedDatabase();
