import mongoose from "mongoose";
import NoteModel from "../models/notes.model.js";
import jwt from "jsonwebtoken";

// Creates a note for the currently logged-in user.
export const createNote = async (req, res) => {
  const { title, description } = req.body;

  // Read the JWT from the cookie and verify it to get the logged-in user's data.
  const token = req.cookies.token;
  const user = jwt.verify(token, process.env.JWT_SECRET);

  // Store the decoded user on the request object for this request flow.
  req.user = user;

  // If there is no token or decoded user, the request is not authenticated.
  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  if (!user) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  // Validate note input before creating a database document.
  if (!title) {
    return res.status(400).json({ error: "Title is required" });
  }

  if (!description) {
    return res.status(400).json({ error: "Description is required" });
  }

  if (title.length < 5) {
    return res
      .status(400)
      .json({ error: "Title must be at least 5 characters long" });
  }

  if (description.length < 10) {
    return res
      .status(400)
      .json({ error: "Description must be at least 10 characters long" });
  }

  // Save the note with the user's email so it belongs to the logged-in user.
  const newNote = await NoteModel.create({
    title,
    description,
    user: user.email,
  });

  return res.status(201).json({
    message: "Note created successfully",
    note: newNote,
  });
};

// Fetches all notes that belong to the currently logged-in user.
export const getAllNotes = async (req, res) => {
  // Verify the JWT from the cookie to know which user's notes to fetch.
  const token = req.cookies.token;
  const user = jwt.verify(token, process.env.JWT_SECRET);
  req.user = user;

  if (!user) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  // Only return notes whose user field matches the logged-in user's email.
  const notes = await NoteModel.find({ user: user.email });

  // Handle the case where the database query does not return notes.
  if (!notes) {
    return res.status(404).json({ error: "Notes not found" });
  }

  return res.status(200).json({
    message: "Notes fetched successfully",
    notes,
  });
};

// Fetches a single note by its MongoDB id.
export const getNoteById = async (req, res) => {
  const { id } = req.params;

  // Verify the JWT from the cookie before allowing access to note data.
  const token = req.cookies.token;
  const user = jwt.verify(token, process.env.JWT_SECRET);
  req.user = user;

  if (!user) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  // Validate that the id is a proper MongoDB ObjectId before querying.
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      error: "Invalid Note ID format",
    });
  }

  // Look up the note document by id.
  const note = await NoteModel.findById(id);

  // Return a 404 response when the id is valid but no note exists.
  if (!note) {
    return res.status(404).json({ error: "Note not found" });
  }

  return res.status(200).json({
    message: "Note fetched successfully",
    note,
  });
};

// Updates the description of a note by its MongoDB id.
export const updateNoteById = async (req, res) => {
  const { id } = req.params;
  const { description } = req.body;

  // Verify the JWT from the cookie before allowing note updates.
  const token = req.cookies.token;
  const user = jwt.verify(token, process.env.JWT_SECRET);
  req.user = user;

  if (!user) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  // Validate the note id format before running the update query.
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      error: "Invalid Note ID format",
    });
  }

  if (!description) {
    return res.status(400).json({ error: "Description is required" });
  }

  if (description.length < 10) {
    return res
      .status(400)
      .json({ error: "Description must be at least 10 characters long" });
  }

  // Update the note and return the latest version after the update.
  const updatedNote = await NoteModel.findByIdAndUpdate(
    id,
    {
      description,
    },
    { new: true },
  );

  // If no note matched the id, tell the client that the note was not found.
  if (!updatedNote) {
    return res.status(404).json({ error: "Note not found" });
  }

  return res.status(200).json({
    message: "Note updated successfully",
    note: updatedNote,
  });
};

// Deletes a note by its MongoDB id.
export const deleteNoteById = async (req, res) => {
  const { id } = req.params;

  // Validate the note id format before running the delete query.
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      error: "Invalid Note ID format",
    });
  }

  // Delete the matching note document from MongoDB.
  const deletedNote = await NoteModel.findByIdAndDelete(id);

  // If no note matched the id, return a not found response.
  if (!deletedNote) {
    return res.status(404).json({ error: "Note not found" });
  }

  return res.status(200).json({
    message: "Note deleted successfully",
    note: deletedNote,
  });
};
