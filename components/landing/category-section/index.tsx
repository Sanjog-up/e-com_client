import React from 'react'
import { FaChevronDown } from 'react-icons/fa6';
import CategoryList from '@/components/forms/admin/categories/category-list';


const CategorySection = () => {
   
  return (
    <div className='pt-10 py-3 bg-gray-50'>
        {/* heading section */}
        <div className='flex justify-between px-10'>
        {/*  left section */}
            <div className='flex justify-between'>
                <h2 className='text-xl font-bold text-gray-600 tracking-wider'>All Categories</h2>
                <p className='text-sm font-normal text-gray-600 '> Explore all categories</p>
            </div>
            <div className='flex gap-1 items-center cursor-pointer'>
                <span> explore all</span>
                <FaChevronDown/>
            </div>
            {/* right section */}
        </div >
        <div className='mt-4'>
            <CategoryList/>
        </div>
        
    </div>
  )
}
export default CategorySection
