'use client'

import { ProductModalProvider } from '@/context/productmodal.context'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from 'react'

const client = new QueryClient({
  defaultOptions:{
    queries:{
      staleTime: 60 * 1000,
      gcTime: 5 * 60 * 1000,
      retry: 1,
      refetchOnWindowFocus: false,
    }
  }
})

const ReactQueryProvider = ({children}: Readonly<{children: React.ReactNode}>) => {
  return (
    <QueryClientProvider client={client}>
        {children}
    </QueryClientProvider>
  )
}

export default ReactQueryProvider