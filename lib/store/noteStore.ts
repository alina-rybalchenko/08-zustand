import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { NewNoteData } from '@/types/note';

const initialDraft: NewNoteData = {
  title: '',
  content: '',
  tag: 'Todo',
};

interface useNoteDraft {
  draft: NewNoteData;
  setDraft: (note: NewNoteData) => void;
  clearDraft: () => void;
}

export const useNoteDraft = create<useNoteDraft>()(
  persist(
    set => ({
      draft: initialDraft,
      setDraft: note => set(() => ({ draft: note })),
      clearDraft: () => set(() => ({ draft: initialDraft })),
    }),
    {
      name: 'note-draft',
      partialize: state => ({ draft: state.draft }),
    }
  )
);
