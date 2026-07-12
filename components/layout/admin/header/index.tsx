
import Button from '@/components/common/ui/button'
import React from 'react'
import Header from '../../header'
const AdminHeader = () => {
    return (
       
        <nav className='h-16 border-b border-indigo-200 w-full flex items-center justify-between px-8'>
            
            <div className=''>
                <h4 className='text-xl font-black'>Welcome, <span className='italic text-indigo-500'>Admin</span></h4>
            </div>
            {/* auth */}
            <div className='h-13 w-30 '>
                <Button label='Logout' />
            </div>
        </nav>
    )
}

export default AdminHeader