'use client'
import withAuth from '@/hoc/withAuth.hoc'
import { Role } from '@/types/enum.types'
import React from 'react'

const Cart = () => {
  return (
    <main className='h-full'>
      Cart
    </main>
  )
}

const Page = withAuth(Cart, [Role.USER])
export default Page;