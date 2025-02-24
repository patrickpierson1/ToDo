const mongoose = require('mongoose');
const ListSchema = require('./List');

const NoteSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },  // User identifier.
  title: { type: String, default: '', required: true },                           // Title of note.
  content: { type: String, required: true },                                      // Content of note.
  todos: [ListSchema],                                                            // ToDo list contents.
  tags: [{ type: String }],                                                       // Tags for sorting etc.
  color: { type: String, default: '#ffffff' },                                    // Color of note for organization/theming.
  pinned: { type: Boolean, default: false },                                      // If note is to be displayed at top of page or not.
  archived: { type: Boolean, default: false },                                    // If note has been archived (hidden) or not.
  createdAt: { type: Date, default: Date.now },                                   // When note was created.
  updatedAt: { type: Date, default: Date.now }                                    // When note was last modified.
});

module.exports = mongoose.model('Note', NoteSchema);
