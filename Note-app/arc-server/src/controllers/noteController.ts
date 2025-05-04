import { Request, Response } from "express";
import { Note } from "../models/Notes";

 const createNote = async (req: Request, res: Response) => {
  try {
    const note = await Note.create(req.body);
    res.status(201).json(note);
  } catch (err) {
    res.status(400).json({ error: "Failed to create note" });
  }
};

const getUserNotes = async (req: Request, res: Response) => {
  try {
    const notes = await Note.find({ userEmail: req.params.userEmail });
    res.status(200).json(notes);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch notes" });
  }
};

const updateNote = async (req: Request, res: Response) => {
  try {
    const updated = await Note.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updated);
  } catch (err) {
    res.status(400).json({ error: "Failed to update note" });
  }
};

const deleteNote = async (req: Request, res: Response) => {
  try {
    await Note.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Note deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete note" });
  }
};


export { createNote, getUserNotes, updateNote, deleteNote };