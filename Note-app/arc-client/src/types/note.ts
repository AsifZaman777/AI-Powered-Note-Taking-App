interface NoteType {
    _id: string;
    userEmail: string;
    title: string;
    content?: string;
    tags?: string[];
    createdAt: string;
    updatedAt: string;
  }

  export type { NoteType };