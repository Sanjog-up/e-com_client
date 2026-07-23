'use client'

import { TProduct } from '@/types/product.types'
import Image from 'next/image'
import { useProductModal } from '@/context/productmodal.context'

// interface ProductImage {
//   path: string,
//   public_id: string
// } 

// interface Product{
//   _id: string,
//   name: string,
//   description: string,
//   price: number,
//   discountedPrice?: number,
//   images: ProductImage[],
//   cover_image: ProductImage
// }
const ProductCard = ({product}:{product:TProduct}) => {
  const { openProduct } = useProductModal()
  return (
    <button
    onClick={()=> openProduct(product._id)}
    className='text-left w-full'>
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
        <p className='text-lg font-semibold text-gray-400'>{product.name}</p>
        <p className='line-clamp-2 leading-5 text-sm text-gray-400'>{product.description}</p>
      </div>
    </div>
    </button>
  )
}

export default ProductCard
