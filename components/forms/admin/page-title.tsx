import Link from 'next/link'
// import { title } from 'process'
import React from 'react'

interface IProps{
    title?: string
    linkText?:string
    link?: string
}

const PageTitle = ({title, linkText, link = '#'}: IProps) => {
  return (
    <div className='flex w-full items-center px-3 justify-between border-gray-200 rounded py-3 min-h-24 shadow'>
        
        {/* title */}
        <h1 className='text-xl font-extrabold text-gray-700'>{title}</h1> 

      {/* link */}
      {linkText &&  <Link 
      className='border bg-indigo-100/30 text-indigo-300 border-indigo-300 px-5 py-3 min-w-30 rounded text-center text-[18px] font-bold '
      href={link}>
        {linkText}
      </Link>}
    </div>
  )
}
export default PageTitle
