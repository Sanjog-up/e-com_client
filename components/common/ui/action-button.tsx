'use client'
import Link from 'next/link'
import React from 'react'
import { CiTrash } from 'react-icons/ci'
import { MdEditDocument } from 'react-icons/md'

interface IProps {
    onDelete: () => void,
    editLink: string,
}
const ActionButtons = ({ onDelete, editLink = '#' }: IProps) => {
  return (
    <div className='flex gap-2 justify-center'>
            <CiTrash onClick={()=> {onDelete()}} title="Delete" className='text-red-500 text-[20px] cursor-pointer'/>
            <Link href={editLink}>
            <MdEditDocument  title="Edit" className='text-blue-500 text-[20px] cursor-pointer'/>
            </Link>
          </div>
    )
    }

export default ActionButtons
