// src/components/NoteCard.tsx

import { NoteType } from "@/types/note";
import { Button } from "./ui/button";

interface NoteCardProps {
  note: NoteType;
  onEdit: (note: NoteType) => void;
  onDelete: (id: string) => void;
}

export default function NoteCard({ note, onEdit, onDelete }: NoteCardProps) {
  return (
    <div className="border rounded-lg p-4 bg-white dark:bg-slate-800 shadow-sm">
      <h3 className="text-lg font-semibold">{note.title}</h3>
      <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">{note.content}</p>

      <div className="flex justify-end gap-2 mt-4">
        <Button variant="outline" onClick={() => onEdit(note)}>
          Edit
        </Button>
        <Button variant="destructive" onClick={() => onDelete(note._id)}>
          Delete
        </Button>
      </div>
    </div>
  );
}
