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

      <div className='flex flex-col border border-line border-indigo-100 rounded-sm overflow-hidden bg-paper transition-colors hover:border-signal/40'>
      <div className='relative w-full h-56 aspect-square overflow-hidden bg-line/30'>
        <Image
        src={product.cover_image.path}
        alt={product.name}
        fill
        className='rounded-sm object-cover'
        />
        <WishlistButton productId={product._id} 
        className='absolute top-2 right-2 z-10 bg-paper/80 backdrop:blur-sm hover:bg-paper' />
      </div>
      <div className='p-3 bg-blue-900'>
        <p className='text-base font-medium font-display text-ink line-clamp-1' >{product.name}</p>
        <p className='line-clamp-2 leading-5 text-sm text-graphit mt-0.5'>{product.description}</p>
      </div>
    </div>
    </div>
  )
}

export default ProductCard
