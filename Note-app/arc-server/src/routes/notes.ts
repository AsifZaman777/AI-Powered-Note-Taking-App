import express from "express";
import {
  createNote,
  getUserNotes,
  deleteNote,
  updateNote,
} from "../controllers/noteController";

const router = express.Router();

router.post("/", createNote);
router.get("/:userEmail", getUserNotes);
router.put("/:id", updateNote);
router.delete("/:id", deleteNote);

export default router;
