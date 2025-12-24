'use client';

import css from './NotePreview.module.css';
import { useParams, useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api';
import Modal from '@/components/Modal/Modal';
import type { Note } from '@/types/note';

export default function NotePreview() {
  const { id } = useParams<{ id: string }>();
  const {
    data: note,
    isLoading,
    isError,
  } = useQuery<Note, Error>({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
    enabled: Boolean(id),
    refetchOnMount: false,
  });
  const router = useRouter();
  const handleCloseModal = () => router.back();

  const noteData = note?.updatedAt
    ? `Updated at: ${note?.updatedAt}`
    : `Created at: ${note?.createdAt}`;

  if (isLoading) {
    return <p>Loading, please wait...</p>;
  }
  if (isError) {
    return <p>Something went wrong.</p>;
  }

  if (!note) {
    return <p>There is no notes...</p>;
  }

  return (
    <Modal onClose={handleCloseModal}>
      {note && (
        <div className={css.container}>
          <div className={css.item}>
            <h2 className={css.title}>{note.title}</h2>
            <p className={css.content}>{note.content}</p>
            <div className={css.footerPreviewModal}>
              <span className={css.tag}>{note.tag}</span>
              <p className={css.date}>{noteData}</p>
            </div>
            <button className={css.backBtn} onClick={handleCloseModal}>
              Back
            </button>
          </div>
        </div>
      )}
    </Modal>
  );
}
