import express from "express";
import {
  createNote,
  getAllNotes,
  getNoteById,
  updateNoteById,
  deleteNoteById,
} from "../controllers/notes.controller.js";

// Router groups all note-related endpoints together.
const router = express.Router();

/**
 * @route POST /api/notes/create
 * @desc Create a new note for the logged-in user
 * @access Requires JWT cookie
 */
// Sends note creation requests to the createNote controller.
router.post("/create", createNote);

/**
 * @route GET /api/notes/get-all
 * @desc Get all notes for the logged-in user
 * @access Requires JWT cookie
 */

// Sends requests for all logged-in user notes to the getAllNotes controller.
router.get("/get-all", getAllNotes);

/**
 * @route GET /api/notes/:id
 * @desc Get a single note by id
 * @access Requires JWT cookie
 */

// Sends requests for one note to the getNoteById controller.
router.get("/:id", getNoteById);

/**
 * @route PATCH /api/notes/update/:id
 * @desc Update a single note by id
 * @access Requires JWT cookie
 */

// Sends note update requests to the updateNoteById controller.
router.patch("/update/:id", updateNoteById);

/**
 * @route DELETE /api/notes/delete/:id
 * @desc Delete a single note by id
 * @access Public
 */

// Sends note delete requests to the deleteNoteById controller.
router.delete("/delete/:id", deleteNoteById);

export default router;
