import React from 'react'

const AdminListCard = ({ children }: Readonly <{
    children: React.ReactNode
}>) => {
  return (
    <div className='min-h-180 border border-gray-200 shadow rounded mt-4 px-3 py-4'>
      {
        children
      }
    </div>
  )
}

export default AdminListCard
