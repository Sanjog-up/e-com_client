import React from 'react'
import { FaChevronDown } from "react-icons/fa6";
import CategoryList from '../category-section/list';
const NewArrivals = () => {
    return (
        <div className='mt-10 py-4 bg-gray-50 min-h-60 px-20 '>
            {/* heading */}
            <div className='flex justify-between '>
                {/* left section */}
                <div>
                    <h2 className='text-xl font-bold text-gray-700 tracking-wider'>New Arrivals</h2>
                    <p className='text-sm font-normal text-gray-500'>Explore our newly added products</p>
                </div>
                <div className='flex gap-1 items-center cursor-pointer'>
                    <span>Explore All</span>
                    <FaChevronDown />
                </div>
                {/* right section */}
            </div>

            {/* card */}
            <div className='mt-4'>
                <CategoryList />
            </div>


        </div>
    )
}

export default NewArrivals