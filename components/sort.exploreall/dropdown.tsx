'use client'

import Link from "next/link"
import { useState  } from "react"
import { FaChevronDown } from "react-icons/fa"

export interface ExploreOption {
    label: string;
    href: string;
}

const ExploreDropDown = ({options} : {options: ExploreOption[]}) => {
    const [isOpen, setIsOpen ] = useState(false);

    return(
        <div className="relative"
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={()=> setIsOpen(false)}
        >
            <button
            type="button"
            className="flex gap-1 items-center cursor-pointer text-gray-700 hover:text-blue-700">
                <span>Explore All</span>
                <FaChevronDown
                className={`transition-transform duration-150 ${
                    isOpen ? "rotate-180" : ''
                }`}
                />
            </button>

            {isOpen && (
                <div className="absolute right-0 top-full z-20 w-56 rounded-md border border-gray-100 bg-white py-1 shadow-lg max-h-80 overflow-y-auto">
                    {options.map((option)=> (
                        <Link
                        key={option.href}
                        href={option.href}
                        className="block px-4 py02 text-sm text-gray-600 hover:bg-blue-50 hover:text-blue-600"
                        >
                            {option.label}
                        </Link>
                    ))}
                </div>
            )}
        </div>
    )

} 

export default ExploreDropDown;