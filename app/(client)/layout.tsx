'use client'
import Header from '@/components/layout/header';
import Navbar from '@/components/layout/header/index';
import withAuth from '@/hoc/withAuth.hoc';
import { Role } from '@/types/enum.types';
import React from 'react'

const Layout = ({
     children,
}: Readonly<{
  children: React.ReactNode;}>
) => {
    
  return (
    <main className='h-full w-full'>
      <Navbar/>
      <section className='min-h-[80vh] px-10 pt-1'>
        {children}
      </section>
      <div>
        Client footer
      </div>
    </main>
  )
}
export default Layout
