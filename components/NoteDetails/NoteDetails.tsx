// components/NoteDetails/NoteDetails.tsx

import styles from './NoteDetails.module.css';
import type { Note } from '@/types/note';

type NoteDetailsProps = {
  note: Note;
};

export default function NoteDetails({ note }: NoteDetailsProps) {
  const noteData = note.updatedAt
    ? `Updated at: ${note?.updatedAt}`
    : `Created at: ${note?.createdAt}`;
  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <div className={styles.header}>
          <h2>{note.title}</h2>
        </div>
        <p className={styles.content}>{note.content}</p>
        <p className={styles.date}>{noteData}</p>
      </div>
    </div>
  );
}
