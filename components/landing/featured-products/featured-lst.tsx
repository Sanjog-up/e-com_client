'use client'
import ProductCard from './product-card'
import { TProduct } from '@/types/product.types'
import { useQuery } from '@tanstack/react-query'
import { getAllProducts } from '@/api/product.api'
import { MdOutlineCloudOff } from 'react-icons/md'

const  FeaturedList = () => {
    const {isLoading, data, error} = useQuery({
      queryFn: getAllProducts,
      queryKey: ['get-all-products'],
    })
  return (
    <div className='h-full'>

    
      {/* loading */}
      {isLoading && (
        <div className='w-full grid grid-cols-5 gap-4'>
        {Array.from({ length: 10}, (_,i) => i +1).map((val)=> (<FeaturedSkeleton key={val}/>))}
        </div>)}

        {/* map data */}
        {!isLoading && data?.data && data.data.length> 0 && 
        (<div className='grid grid-cols-5 gap-4'>
          {data?.data.map((product: TProduct) => (
            <ProductCard product={product} key={product._id}
            />))}
        </div>)}

        {/* notfound */}
      {
      !isLoading && data?.data  && data?.data.length === 0
         && (<div className='h-full w-full flex flex-col items-center justify-center'>
            <MdOutlineCloudOff className='text-indigo-300' size={38}/>
            <p className='text-gray-500 font-medium text-lg'>Products not found</p>
        </div>
      )}
    </div>   
  )
}

const FeaturedSkeleton = () => {
  return (
    <div className='animate-pulse h-20 w-full bg-gray-200 p-1 rounded'>
      <div className='grid grid-cols-12 gap-2'>
        <div className='h-18 aspect-square bg-gray-300 rounded col-span-4'/>
        <div className='col-span-8 flex flex-col justify-center gap-3'>
          <div className='h-5 bg-gray-200 rounded'/>
          <div className='h-8 bg-gray-200 rounded'/>
        </div>
      </div>
    </div>
  )
}
export default FeaturedList