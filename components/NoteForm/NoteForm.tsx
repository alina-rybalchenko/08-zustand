// components/NoteForm/NoteForm.tsx
'use client';

import { useId } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import css from './NoteForm.module.css';
import { createNote } from '../../lib/api';
import Error from '@/components/Error/Error';
import { useRouter } from 'next/navigation';
import { useNoteDraft } from '@/lib/store/noteStore';
import type { NewNoteData } from '@/types/note';

export default function NoteForm() {
  const fieldId = useId();
  const queryClient = useQueryClient();
  const router = useRouter();
  const { draft, setDraft, clearDraft } = useNoteDraft();

  const { mutate, isError, isPending } = useMutation({
    mutationFn: createNote,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['notes'] });

      clearDraft();

      router.back();
    },
  });

  const handleCancel = () => {
    router.back();
  };

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setDraft({ ...draft, [event.target.name]: event.target.value });
  };

  const handleTaskCreate = (formData: FormData) => {
    const values = Object.fromEntries(formData) as unknown as NewNoteData;

    if (!values.title.trim()) {
      alert('Title cannot be empty.');
      return;
    }
    mutate(values);
  };

  return (
    <form className={css.form} action={handleTaskCreate}>
      <fieldset className={css.formGroup}>
        <label htmlFor={`${fieldId}-title`}>Title</label>
        <input
          id={`${fieldId}-title`}
          type="text"
          name="title"
          className={css.input}
          value={draft.title}
          onChange={handleChange}
          required
        />
      </fieldset>

      <fieldset className={css.formGroup}>
        <label htmlFor={`${fieldId}-content`}>Content</label>
        <textarea
          id={`${fieldId}-content`}
          name="content"
          rows={8}
          className={css.textarea}
          value={draft.content}
          onChange={handleChange}
        />
      </fieldset>

      <fieldset className={css.formGroup}>
        <label htmlFor={`${fieldId}-tag`}>Tag</label>
        <select
          id={`${fieldId}-tag`}
          name="tag"
          value={draft.tag}
          className={css.select}
          onChange={handleChange}
        >
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Meeting">Meeting</option>
          <option value="Shopping">Shopping</option>
        </select>
      </fieldset>

      <div className={css.actions}>
        <button
          type="button"
          className={css.cancelButton}
          onClick={handleCancel}
        >
          Cancel
        </button>
        <button type="submit" className={css.submitButton} disabled={isPending}>
          {isPending ? 'Creating...' : 'Create note'}
        </button>
        {isError && <Error />}
      </div>
    </form>
  );
}
