import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
  userEmail: { type: String, required: true },
  title: { type: String, required: true },
  content: { type: String },
  tags: [{ type: String }],
}, { timestamps: true });

export const Note = mongoose.model("Note", noteSchema);
