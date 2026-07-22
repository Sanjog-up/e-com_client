'use client'

import { TProduct } from '@/types/product.types'
import Image from 'next/image'

interface Product{
  _id: string,
  name: string,
  price: number,
  discountedPrice?: number,
  images: string[],
  brand?: string;
}
const ProductCard = ({product}:{product:Product[]}) => {
  const { openProduct } = useProd
  return (
    <button
    onClick={()=> openPr}
    <div className='flex flex-col borderborder-indigo-100 rounded-sm overflow-hidden'>
      <div className='relative w-full h-56 aspect-square'>
        <Image
        src={product.cover_image.path}
        alt={product.name}
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
