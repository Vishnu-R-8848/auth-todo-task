import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      minlength: 5,
      unique: true,
    },
    description: {
      type: String,
      minlength: 10,
    },
  },
  {
    timestamps: true,
  },
);

const NoteModel = mongoose.model("Note", noteSchema);

export default NoteModel;


