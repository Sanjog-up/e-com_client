import React from 'react'
import Image  from 'next/image'

const Logo = () => {
  return (
    <div className='h-8 flex items-center justify-center max-w-30'>
      <Image
      src ={'/next.svg'}
      alt='logo'
      height={100}
      width={100}
      className='w-full'
      />
    </div>
  )
}

export default Logo