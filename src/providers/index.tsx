'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import * as React from 'react'
import { ReactQueryStreamedHydration } from '@tanstack/react-query-next-experimental'
import Header from '@/components/header'
import Footer from '@/components/footer'

export function Providers(props: { children: React.ReactNode }) {
  const [queryClient] = React.useState(() => new QueryClient())

  return (
    <QueryClientProvider client={queryClient}>
      <Header />
      <ReactQueryStreamedHydration>
        {props.children}
      </ReactQueryStreamedHydration>
      <Footer />
    </QueryClientProvider>
  )
}