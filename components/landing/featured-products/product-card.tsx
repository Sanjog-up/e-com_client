'use client'

import { TProduct } from '@/types/product.types'
import Image from 'next/image'
import { useProductModal } from '@/context/productmodal.context'
import WishlistButton from '@/components/common/ui/wishlist-button'

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

      <div className='flex flex-col border border-indigo-100 rounded-sm overflow-hidden bg-white'>
      <div className='relative w-full h-56 aspect-square overflow-hidden'>
        <Image
        src={product.cover_image.path}
        alt={product.name}
        fill
        className='rounded-sm object-cover'
        />
        <WishlistButton productId={product._id} 
        className='absolute top-2 right-2 z-10 bg-white/10 backdrop:blur-sm hover:bg-white' />
      </div>
      <div className='p-3 bg-blue-900'>
        <p className='text-lg font-semibold text-gray-300 line-clamp-1' >{product.name}</p>
        <p className='line-clamp-2 leading-5 text-sm text-gray-400'>{product.description}</p>

      </div>
    </div>
    </div>
  )
}

export default ProductCard
