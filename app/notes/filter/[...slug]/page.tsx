import {
  QueryClient,
  dehydrate,
  HydrationBoundary,
} from '@tanstack/react-query';
import NotesClient from './Notes.client';
import { fetchNotes } from '@/lib/api';
import { Metadata } from 'next';

interface PageProps {
  params: Promise<{ slug: string[] }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = slug[0];
  const categoryName = category.charAt(0).toUpperCase() + category.slice(1);

  return {
    title: `${categoryName} Notes`,
    description: `Here you can view ${categoryName} notes`,
    openGraph: {
      title: `${categoryName} Notes`,
      description: `Here you can view ${categoryName} notes`,
      url: `https://08-zustand-nmditeggz-alinas-projects-3a64970f.vercel.app/notes/filter/${category}`,
      images: [
        {
          url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
          width: 1200,
          height: 630,
          alt: `${categoryName} Notes`,
        },
      ],
    },
  };
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;

  const tag = slug[0] === 'all' ? undefined : slug[0];

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['notes', '', 1, tag],
    queryFn: () =>
      fetchNotes({
        search: '',
        page: 1,
        tag,
      }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={tag} />
    </HydrationBoundary>
  );
}
