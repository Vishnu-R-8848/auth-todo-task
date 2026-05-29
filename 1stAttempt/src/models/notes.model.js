import mongoose from "mongoose";

// Note schema defines the shape and validation rules for note documents.
const noteSchema = new mongoose.Schema(
  {
    // Title is required, must be at least 5 characters, and must be unique.
    title: {
      type: String,
      required: true,
      minlength: 5,
      unique: true,
    },
    // Description stores the main note content.
    description: {
      type: String,
      minlength: 10,
    },
    // Stores the email of the user who created the note.
    user: String,
  },
  {
    // Automatically adds createdAt and updatedAt fields to each note.
    timestamps: true,
  },
);

// Create and export the Note model so controllers can create, read, update, and delete notes.
const NoteModel = mongoose.model("Note", noteSchema);

export default NoteModel;
