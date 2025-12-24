import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api';

import NotePreview from '@/app/@modal/(.)notes/[id]/NotePreview.client';

interface NotePreviewPageProps {
  params: Promise<{ id: string }>;
}

export default async function NotePreviewPage({
  params,
}: NotePreviewPageProps) {
  const { id } = await params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotePreview />
    </HydrationBoundary>
  );
}
