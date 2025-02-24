// This file creates test information to fill the db with.
// It is ran manually with 'node server/database/seed.js'

const mongoose = require('mongoose');
const Note = require('../models/Note');
const User = require('../models/User'); // Assuming you have a User model
require('dotenv').config();
const connectDB = require('../config/db');

connectDB();

const seedDB = async () => {
  try {
    await Note.deleteMany(); // Clear existing notes
    
    const user = await User.findOne(); // Fetch a user (assuming one exists)
    if (!user) {
      console.log('No user found. Please create a user before seeding notes.');
      mongoose.disconnect();
      return;
    }
    
    const note = [
      {
        userId: user._id,
        title: 'First Note',
        content: 'This is the first note.',
        todos: [
          { text: 'First ToDo item', completed: false },
          { text: 'Second ToDo item', completed: true }
        ],
        tags: ['work', 'urgent'],
        color: '#ffcc00',
        pinned: true,
        archived: false
      },
      {
        userId: user._id,
        title: 'Second Note',
        content: 'Another example note.',
        todos: [
          { text: 'Buy groceries', completed: false },
          { text: 'Pay bills', completed: false }
        ],
        tags: ['personal'],
        color: '#66ccff',
        pinned: false,
        archived: false
      }
    ];

    await Note.insertMany(note);
    console.log('Notes seeded successfully!');
    mongoose.disconnect();
  } catch (error) {
    console.error('Seeding failed:', error);
    mongoose.disconnect();
  }
};

seedDB();
