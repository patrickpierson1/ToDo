// seed.js
require('dotenv').config({ path: './.env' });
console.log("MONGO_URI:", process.env.MONGO_URI);

const mongoose = require('mongoose');
const {
  connectDB,
  disconnectDB,
  createUser,
  createNote,
  addToList,
  setListItemCompletion,
  noteBelongsToUser,
  updateNoteContent,
  getNotesByUserId, // New function to get notes by user ID
} = require('./interface');

// Determine if verbose mode is enabled.
const verbose = process.argv.includes('-v') || process.argv.includes('--verbose');

// Utility to print out the entire database state.
const printDBState = async () => {
  try {
    const collections = await mongoose.connection.db.listCollections().toArray();
    for (const coll of collections) {
      const docs = await mongoose.connection.db.collection(coll.name).find({}).toArray();
      console.log(`--- ${coll.name} ---`);
      console.log(JSON.stringify(docs, null, 2));
    }
  } catch (error) {
    console.error("Error printing DB state:", error);
  }
};

const seedDB = async () => {
  try {
    await connectDB();

    // Reset the database.
    await mongoose.connection.dropDatabase();
    if (verbose) console.log("Database reset.");

    // Create multiple users.
    const user1 = await createUser("alice@example.com", "alicepass");
    const user2 = await createUser("bob@example.com", "bobpass");
    const user3 = await createUser("charlie@example.com", "charliepass");
    if (verbose)
      console.log("Users created:", { user1, user2, user3 });

    // Create notes for each user.
    // Alice's notes
    const aliceNote1 = await createNote(user1, "Alice Note 1", "Alice's first note content.");
    const aliceNote2 = await createNote(user1, "Alice Note 2", "Alice's second note content.");
    if (verbose)
      console.log("Alice's notes created:", { aliceNote1, aliceNote2 });

    // Bob's note with list items
    let bobNote = await createNote(user2, "Bob's Shopping List", "List of items to buy:");
    bobNote = await addToList(bobNote._id, "Milk");
    bobNote = await addToList(bobNote._id, "Bread");
    bobNote = await addToList(bobNote._id, "Eggs");
    // Mark the first item complete.
    const bobFirstItemId = bobNote.lists[0]._id;
    bobNote = await setListItemCompletion(bobNote._id, bobFirstItemId, true);
    if (verbose)
      console.log("Bob's note with lists created:", bobNote);

    // Charlie's note
    const charlieNote = await createNote(user3, "Charlie Note", "Charlie's note with no list items.");
    if (verbose)
      console.log("Charlie's note created:", charlieNote);

    // Verify note ownership (example for Alice's first note)
    const ownership = await noteBelongsToUser(aliceNote1._id, user1._id);
    if (verbose)
      console.log(`Alice's first note belongs to Alice? ${ownership}`);

    // Optional: Update a note's content (example update for Charlie's note)
    const updatedCharlieNote = await updateNoteContent(charlieNote._id, "Updated content for Charlie's note.");
    if (verbose)
      console.log("Charlie's note after content update:", updatedCharlieNote);

    // Get all notes that belong to each user.
    const aliceNotes = await getNotesByUserId(user1._id);
    const bobNotes = await getNotesByUserId(user2._id);
    const charlieNotes = await getNotesByUserId(user3._id);
    if (verbose) {
      console.log("All notes for Alice:", aliceNotes);
      console.log("All notes for Bob:", bobNotes);
      console.log("All notes for Charlie:", charlieNotes);
    }

    // Optionally output an organized view of the database.
    if (verbose) await printDBState();
    else console.log("Seeding completed. Use -v or --verbose to see detailed output.");
  } catch (error) {
    console.error("Seeding failed:", error);
  } finally {
    await disconnectDB();
  }
};

seedDB();
