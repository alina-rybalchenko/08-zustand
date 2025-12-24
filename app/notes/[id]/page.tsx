// app/notes/[id]/page.tsx

import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query';

import NoteDetailsClient from './NoteDetails.client';
import { fetchNoteById } from '@/lib/api';

type NotePageProps = {
  params: Promise<{ id: string }>;
};

export default async function NotePage({ params }: NotePageProps) {
  const queryClient = new QueryClient();
  const { id } = await params;

  await queryClient.prefetchQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient />
    </HydrationBoundary>
  );
}
