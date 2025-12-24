// components/NoteList/NoteList.tsx
'use client';

import type { Note } from '../../types/note';
import Link from 'next/link';
import css from './NoteList.module.css';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteNote } from '@/lib/api';

interface NoteListProps {
  notes: Note[];
}

export default function NoteList({ notes }: NoteListProps) {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
  });

  const handleDeleteNote = (id: string) => {
    mutate(id);
  };
  return (
    <ul className={css.list}>
      {notes.map(note => {
        return (
          <li className={css.listItem} key={note.id}>
            <h2 className={css.title}>{note.title}</h2>
            <p className={css.content}>{note.content}</p>
            <div className={css.footer}>
              <span className={css.tag}>{note.tag}</span>
              <Link href={`/notes/${note.id}`} className={css.detailsBtn}>
                View details
              </Link>
              <button
                type="button"
                className={css.button}
                onClick={() => handleDeleteNote(note.id)}
              >
                Delete
              </button>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
