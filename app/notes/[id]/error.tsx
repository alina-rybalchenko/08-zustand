// app/notes/[id]/error.tsx

'use client';

interface ErrorProps {
  error: Error & { digest?: string };
}

export default function Error({ error }: ErrorProps) {
  return <p>Could not fetch note details. {error.message}</p>;
}
