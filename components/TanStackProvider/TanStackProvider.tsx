// components/TanStackProvider/TanStackProvider.tsx
'use client';

import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

type ProviderProps = {
  children: React.ReactNode;
};

export default function TanStackProvider({ children }: ProviderProps) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
