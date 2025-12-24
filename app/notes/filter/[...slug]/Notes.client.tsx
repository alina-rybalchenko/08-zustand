'use client';

import { useState, useEffect } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api';
import NoteList from '@/components/NoteList/NoteList';
import Pagination from '@/components/Pagination/Pagination';
import SearchBox from '@/components/SearchBox/SearchBox';
import Modal from '@/components/Modal/Modal';
import NoteForm from '@/components/NoteForm/NoteForm';
import Error from '@/components/Error/Error';
import useModalControl from '@/hooks/useModalControl';
import { toast, Toaster } from 'react-hot-toast';
import css from './NotesPage.module.css';

interface NotesClientProps {
  tag?: string;
}

export default function NotesClient({ tag }: NotesClientProps) {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const { isModalOpen, openModal, closeModal } = useModalControl();

  const {
    data: response,
    isSuccess,
    isError,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ['notes', search, page, tag],
    queryFn: () => fetchNotes({ search, page, tag }),

    placeholderData: keepPreviousData,
    refetchOnMount: false,
  });

  const totalPages = response?.totalPages ?? 0;

  useEffect(() => {
    if (response?.notes.length === 0) {
      toast.error('No notes found for your request.');
    }
  }, [response?.notes.length]);

  const handleSearch = useDebouncedCallback((value: string) => {
    setSearch(value);
    setPage(1);
  }, 500);

  return (
    <section className={css.app}>
      <Toaster />
      <div className={css.toolbar}>
        <SearchBox
          search={search}
          onChange={e => handleSearch(e.target.value)}
        />

        {totalPages > 0 && (
          <Pagination
            page={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        )}
        <button className={css.button} onClick={openModal}>
          Create note +
        </button>
      </div>
      {(isLoading || isFetching) && <p>Loading...</p>}
      {isError && <Error />}
      {isSuccess && <NoteList notes={response.notes} />}
      {isModalOpen && (
        <Modal onClose={closeModal}>
          <NoteForm onSuccessClose={closeModal} onCancel={closeModal} />
        </Modal>
      )}
      {totalPages > 0 && (
        <div className={css.bottomPagination}>
          <Pagination
            page={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </div>
      )}
    </section>
  );
}
