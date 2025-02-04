const express = require('express');
const { protect } = require('../middleware/Middleware');
const Note = require('../models/Notes');

const router = express.Router();

// Get user notes
router.get('/', protect, async (req, res) => {
  const notes = await Note.find({ userId: req.user.id });
  res.json(notes);
});

// Create note
router.post('/', protect, async (req, res) => {
  const note = await Note.create({ ...req.body, userId: req.user.id });
  res.status(201).json(note);
});

module.exports = router;
