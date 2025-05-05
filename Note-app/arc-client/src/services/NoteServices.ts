import { NoteType } from "@/types/note";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export const NoteService = {
  async getUserNotes(userEmail: string): Promise<NoteType[]> {
    const res = await fetch(`${BASE_URL}/notes/${userEmail}`);
    if (!res.ok) throw new Error("Failed to fetch notes");
    return res.json();
  },

  async createNote(note: Omit<NoteType, "_id" | "createdAt" | "updatedAt">): Promise<NoteType> {
    const res = await fetch(`${BASE_URL}/notes`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(note),
    });
    if (!res.ok) throw new Error("Failed to create note");
    return res.json();
  },

  async updateNote(id: string, data: Partial<NoteType>): Promise<NoteType> {
    const res = await fetch(`${BASE_URL}/notes/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to update note");
    return res.json();
  },

  async deleteNote(id: string): Promise<{ message: string }> {
    const res = await fetch(`${BASE_URL}/notes/${id}`, {
      method: "DELETE",
    });
    if (!res.ok) throw new Error("Failed to delete note");
    return res.json();
  },
};
