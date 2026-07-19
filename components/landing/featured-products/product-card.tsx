import React from 'react'
import { TProduct } from '@/types/product.types'
import Image from 'next/image'

interface IProps {
    products: TProduct 
}
const ProductCard = ({products}:IProps) => {
  return (
    <div className='flex flex-col borderborder-indigo-100 rounded-sm overflow-hidden'>
      <div className='relative w-full h-56 aspect-square'>
        <Image
        src={products.cover_image.path}
        alt={products.name}
        fill
        className='rounded-sm object-cover'
        />

      </div>
      <div className='p-3'>
        <p className='text-lg font-semibold text-gray-400'>{products.name}</p>
        <p className='line-clamp-2 leading-5 text-sm text-gray-400'>{products.description}</p>
      </div>
    </div>
  )
}

export default ProductCard
