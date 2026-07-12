import React from 'react'
import { TCategory } from '@/types/category.types'
import Image from 'next/image'

interface IProps {
    category: TCategory
}
const CategoryCard = ({ category}: IProps) => {

  return (
    <div className='flex flex-col border border-indigo-100 rounded-sm overflow-hidden'>
      {/* image */}
      <div className='relative w-full h-56 aspect-square'>
        <Image
        src = {category.image.path}
        alt={category.name}
        fill
        className='rounded-sm object-cover'

        />
      </div>
      {/* name & desc */}
      <div className='p-3'>
        <p className='text-lg font-semibold text-gray-400'>{category.name}</p>
        <p className='line-clamp-2 leading-5 text-sm text-gray-400'>{category.description}</p>
      </div>
    </div>
  )
}

export default CategoryCard
