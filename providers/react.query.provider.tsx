'use client'

import { ProductModalProvider } from '@/context/productmodal.context'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from 'react'

const client = new QueryClient()

const ReactQueryProvider = ({children}: Readonly<{children: React.ReactNode}>) => {
  return (
    <QueryClientProvider client={client}>
        {children}
    </QueryClientProvider>
    <ProductModalProvider>
      {children}
      <ProdcutQ
    </ProductModalProvider>
  )
}

export default ReactQueryProvider