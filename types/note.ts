export type Tag = 'Work' | 'Personal' | 'Meeting' | 'Shopping' | 'Todo';

export interface Note {
  id: string;
  title: string;
  content: string;
  tag: Tag;
  createdAt: string;
  updatedAt: string;
}

export interface NewNoteData {
  title: string;
  content: string;
  tag: Tag;
}
