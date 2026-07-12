import Button from '@/components/common/ui/button'
import React from 'react'

const AdminHeader = () => {
  return (
    <nav className='h-16 border-b border-blue-100 w-full flex items-center justify-between'>
      <div>
        <h4 className='text-xl font-black '>Welcome <span className='italic text-blue-100'>Admin</span></h4>
      </div>
      {/* auth */}
      <div className='h-13 w-30'>
        <Button label='Logout'/>
      </div>
    </nav>

    
  )
}

export default AdminHeader
