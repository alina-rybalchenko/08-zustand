'use client';

import { useState, useEffect } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api';
import NoteList from '@/components/NoteList/NoteList';
import Pagination from '@/components/Pagination/Pagination';
import SearchBox from '@/components/SearchBox/SearchBox';
import Error from '@/components/Error/Error';
import { toast, Toaster } from 'react-hot-toast';
import css from './NotesPage.module.css';
import Link from 'next/link';

interface NotesClientProps {
  tag?: string;
}

export default function NotesClient({ tag }: NotesClientProps) {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [inputValue, setInputValue] = useState('');

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
    if (isSuccess && response?.notes.length === 0) {
      toast.error('No notes found for your request.');
    }
  }, [isSuccess, response?.notes.length]);

  const handleSearch = useDebouncedCallback((value: string) => {
    setSearch(value);
    setPage(1);
  }, 500);

  return (
    <section className={css.app}>
      <Toaster />

      <div className={css.toolbar}>
        <SearchBox
          search={inputValue}
          onChange={e => {
            setInputValue(e.target.value);
            handleSearch(e.target.value);
          }}
        />

        {totalPages > 0 && (
          <Pagination
            page={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        )}

        <Link className={css.button} href="/notes/action/create">
          Create note +
        </Link>
      </div>

      {(isLoading || isFetching) && <p>Loading...</p>}
      {isError && <Error />}
      {isSuccess && response?.notes.length > 0 && (
        <NoteList notes={response.notes} />
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
