// app/error.tsx (global fallback)
'use client';
import { useEffect } from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Global error:', error);
  }, [error]);

  return (
    <div style={{ padding: 24 }}>
      <h2>Something went wrong.</h2>
      <p>{String(error?.message ?? 'Unknown error')}</p>
      <button onClick={() => reset()}>Try again</button>
    </div>
  );
}
