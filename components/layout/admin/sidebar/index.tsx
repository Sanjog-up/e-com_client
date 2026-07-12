import Logo from '@/components/logo'
import React from 'react'
import { PiClipboard } from 'react-icons/pi'
import SidebarLinks from './sidebar-content'

const Sidebar = () => {
  return (
    <section className='h-full w-70  border-r border-blue-400'>
        <div className='h-16 flex flex-col py-2 items-center justify-center gap-1'>
      <Logo/>
      <p className='text-[20px] font-semibold italic text-blue-300'>Grey Matter</p>
    </div>
    <div>
       <SidebarLinks/>
    </div>
    </section>
  )
}

export default Sidebar
