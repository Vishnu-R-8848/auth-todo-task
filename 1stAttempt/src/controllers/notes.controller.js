import mongoose from "mongoose";
import NoteModel from "../models/notes.model.js";

// ---- create a note ----
export const createNote = async (req, res) => {
  const { title, description } = req.body;

  // ---- validation ----
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

  // ---- if validation passed, create the note ----
  const newNote = await NoteModel.create({
    title,
    description,
  });

  return res.status(201).json({
    message: "Note created successfully",
    note: newNote,
  });
};

// ---- get all notes ----
export const getAllNotes = async (req, res) => {
  const notes = await NoteModel.find();

  // ---- if no notes found ----
  if (!notes) {
    return res.status(404).json({ error: "Notes not found" });
  }

  return res.status(200).json({
    message: "Notes fetched successfully",
    notes,
  });
};

// ---- get a note by id ----
export const getNoteById = async (req, res) => {
  const { id } = req.params;
  const note = await NoteModel.findById(id);

  // ---- if note not found ----
  if (!note) {
    return res.status(404).json({ error: "Note not found" });
  }

  return res.status(200).json({
    message: "Note fetched successfully",
    note,
  });
};

// ---- update a note by id ----
export const updateNoteById = async (req, res) => {
  const { id } = req.params;
  const { description } = req.body;

  // ---- validation ----

  // ... inside updateNoteById:
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

  // ---- if validation passed, update the note ----
  const updatedNote = await NoteModel.findByIdAndUpdate(
    id,
    {
      description,
    },
    { new: true },
  );

  // ---- if note not found ----
  if (!updatedNote) {
    return res.status(404).json({ error: "Note not found" });
  }

  return res.status(200).json({
    message: "Note updated successfully",
    note: updatedNote,
  });
};

// ---- delete a note by id ----
export const deleteNoteById = async (req, res) => {
  const { id } = req.params;
  const deletedNote = await NoteModel.findByIdAndDelete(id);

  // ---- if note not found ----
  if (!deletedNote) {
    return res.status(404).json({ error: "Note not found" });
  }

  return res.status(200).json({
    message: "Note deleted successfully",
    note: deletedNote,
  });
};
