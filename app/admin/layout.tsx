'use client'
import Sidebar from '@/components/layout/admin/sidebar';
import React from 'react'
import SidebarLinks from '@/components/layout/admin/sidebar/sidebar-content';
import AdminHeader from '@/components/layout/admin/header';
import withAuth from '@/hoc/withAuth.hoc';
import { Role } from '@/types/enum.types';

const Layout = (
    {
  children,
}: Readonly<{
  children: React.ReactNode;
}>
) => {
  return (
    <main className='h-screen flex max-h-screen w-full overflow-clip'>
      <Sidebar/>
        <section className='w-full h-full'>
            <AdminHeader/>
            <section className='py-4 px-2 h-full overflow-y-auto'>
              {children}
            </section>
        </section>
    </main>
  )
}
const AdminLayout = withAuth(Layout, [Role.ADMIN, Role.SUPER_ADMIN])
export default AdminLayout
