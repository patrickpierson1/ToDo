// seed.js
require('dotenv').config({ path: './.env' });
console.log("MONGO_URI:", process.env.MONGO_URI);

const mongoose = require('mongoose');
const {
  connectDB,
  disconnectDB,
  createUser,
  createNote,
  addToNoteList,
  setListItemCompletion,
  noteBelongsToUser,
  updateNoteContent,
} = require('../config/db');

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
    console.log("Database reset.");

    // Create multiple users.
    const user1 = await createUser("alice@example.com", "alicepass");
    const user2 = await createUser("bob@example.com", "bobpass");
    const user3 = await createUser("charlie@example.com", "charliepass");
    console.log("Users created:", { user1, user2, user3 });

    // Create notes for each user.
    // Alice's notes
    const aliceNote1 = await createNote(user1, "Alice Note 1", "Alice's first note content.");
    const aliceNote2 = await createNote(user1, "Alice Note 2", "Alice's second note content.");
    console.log("Alice's notes created:", { aliceNote1, aliceNote2 });

    // Bob's note with list items
    let bobNote = await createNote(user2, "Bob's Shopping List", "List of items to buy:");
    bobNote = await addToNoteList(bobNote._id, "Milk");
    bobNote = await addToNoteList(bobNote._id, "Bread");
    bobNote = await addToNoteList(bobNote._id, "Eggs");
    // Mark the first item complete.
    const bobFirstItemId = bobNote.lists[0]._id;
    bobNote = await setListItemCompletion(bobNote._id, bobFirstItemId, true);
    console.log("Bob's note with lists created:", bobNote);

    // Charlie's note
    const charlieNote = await createNote(user3, "Charlie Note", "Charlie's note with no list items.");
    console.log("Charlie's note created:", charlieNote);

    // Verify note ownership (example for Alice's first note)
    const ownership = await noteBelongsToUser(aliceNote1._id, user1._id);
    console.log(`Alice's first note belongs to Alice? ${ownership}`);

    // Optional: Update a note's content (example update for Charlie's note)
    const updatedCharlieNote = await updateNoteContent(charlieNote._id, "Updated content for Charlie's note.");
    console.log("Charlie's note after content update:", updatedCharlieNote);

    // Output an organized view of the database.
    await printDBState();
  } catch (error) {
    console.error("Seeding failed:", error);
  } finally {
    await disconnectDB();
  }
};

seedDB();
