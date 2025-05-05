// src/pages/dashboard.tsx

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { NoteService } from "@/services/NoteServices";
import { NoteType } from "@/types/note";
import NoteCard from "@/components/NoteCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function DashboardPage() {
  const { data: session } = useSession();
  const userEmail = session?.user?.email ?? "";

  const [notes, setNotes] = useState<NoteType[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    if (userEmail) {
      NoteService.getUserNotes(userEmail).then(setNotes);
    }
  }, [userEmail]);

  const handleSave = async () => {
    if (!title.trim()) return;

    if (editingId) {
      const updated = await NoteService.updateNote(editingId, { title, content });
      setNotes((prev) => prev.map((n) => (n._id === editingId ? updated : n)));
    } else {
      const newNote = await NoteService.createNote({ title, content, tags: [], userEmail });
      setNotes((prev) => [newNote, ...prev]);
    }

    setTitle("");
    setContent("");
    setEditingId(null);
  };

  const handleEdit = (note: NoteType) => {
    setTitle(note.title);
    setContent(note.content ?? "");
    setEditingId(note._id);
  };

  const handleDelete = async (id: string) => {
    await NoteService.deleteNote(id);
    setNotes((prev) => prev.filter((n) => n._id !== id));
  };

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold">Your Notes</h1>

      <div className="space-y-2">
        <Input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <Input placeholder="Content" value={content} onChange={(e) => setContent(e.target.value)} />
        <Button onClick={handleSave}>{editingId ? "Update" : "Add"} Note</Button>
      </div>

      <div className="grid gap-4">
        {notes.map((note) => (
          <NoteCard key={note._id} note={note} onEdit={handleEdit} onDelete={handleDelete} />
        ))}
      </div>
    </div>
  );
}
