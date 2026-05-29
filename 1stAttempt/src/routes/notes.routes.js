import express from "express";
import {
  createNote,
  getAllNotes,
  getNoteById,
  updateNoteById,
  deleteNoteById,
} from "../controllers/notes.controller.js";

const router = express.Router();

/**
 * @route POST /notes/create
 * @desc Create a new note
 * @access Public
 */
router.post("/create", createNote);

/**
 * @route GET /notes/all
 * @desc Get all notes
 * @access Public
 */

router.get("/get-all", getAllNotes);

/**
 * @route GET /notes/:id
 * @desc Get a single note by id
 * @access Public
 */

router.get("/:id", getNoteById);

/**
 * @route PATCH /notes/update/:id
 * @desc Update a single note by id
 * @access Public
 */

router.patch("/update/:id", updateNoteById);

/**
 * @route DELETE /notes/delete/:id
 * @desc Delete a single note by id
 * @access Public
 */

router.delete("/delete/:id", deleteNoteById);

export default router;
