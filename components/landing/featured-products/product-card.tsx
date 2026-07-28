'use client'

import { TProduct } from '@/types/product.types'
import Image from 'next/image'
import { useProductModal } from '@/context/productmodal.context'
import AddToCartButton from '@/components/common/cart/addToCart'

const ProductCard = ({product}:{product:TProduct}) => {
  const { openProduct } = useProductModal()
  return (
    <div
    onClick={()=> openProduct(product._id)}
    role='button'
    tabIndex={0}
    onKeyDown={(e) => e.key === "Enter" && openProduct(product._id)}
    className='text-left w-full'
    >

      <div className='flex flex-col borderborder-indigo-100 rounded-sm overflow-hidden bg-black'>
      <div className='relative w-full h-56 aspect-square overflow-hidden'>
        <Image
        src={product.cover_image.path}
        alt={product.name}
        fill
        className='rounded-sm object-cover'
        />

      </div>
      <div className='p-3'>
        <p className='text-lg font-semibold text-gray-300 line-clamp-1' >{product.name}</p>
        <p className='line-clamp-2 leading-5 text-sm text-gray-400'>{product.description}</p>
        <p className='text-indigo-400 font-bold'>Rs.{product.price}</p>
        <AddToCartButton productId={product._id} />
      </div>
    </div>
    </div>
  )
}

export default ProductCard
