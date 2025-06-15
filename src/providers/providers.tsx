'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryStreamedHydration } from '@tanstack/react-query-next-experimental';
import * as React from 'react';
import { useState } from 'react';

export function Providers(props: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryStreamedHydration>
        {props.children}
      </ReactQueryStreamedHydration>
    </QueryClientProvider>
  )
}