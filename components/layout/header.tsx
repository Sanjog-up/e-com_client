'use client'

import Link from "next/link";
import { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";

const Header = () => {
  const [isMenDropdownOpen, setIsMenDropdownOpen] = useState(false);
  const onMouseEnter = () => {
    setIsMenDropdownOpen(true);
  };
  const onMouseLeave = () => {
    setIsMenDropdownOpen(false);
  };
  
  return (
    
    <header className="sticky  top-0 z-50 border-b border-zinc-200 bg-white">
        <nav className="flex items-center justify-between px-6 py-4 rounded-sm hover:bg-blue-100 transition-colors gap-4">
            
            <Link href={"/"} 
            className="whitespace-nowrap text-xl shrink-0 font-serif">Grey Matter </Link>  

            <section className="flex items-center gap-2 overflow-x-auto scrollbar-hide min-w-0">
            <Link href={"/"} 
            className='italic font-serif font-semibold text-blue-800 px-2 py-2 hover:bg-blue-200 rounded-xl whitespace-nowrap shrink-0' >
            Home
            </Link>

            <Link href={"/products"} 
            className="italic font-semibold font-serif text-blue-800 px-2 py-2 hover:bg-blue-200 rounded-xl shrink-0">
            Products
            </Link>

            <Link href={"/about"} 
            className="italic font-serif font-semibold text-blue-800 px-2 py-2 shrink-0 hover:bg-blue-200 rounded-xl whitespace-nowrap">
            About Us
            </Link>

            <Link href={"/contact"} 
            className="italic font-serif shrink-0 font-semibold text-blue-800 px-2 py-2  hover:bg-blue-200 rounded-xl whitespace-nowrap">
            Contact Us
            </Link>

            <section 
            onMouseEnter={onMouseEnter} 
            onMouseLeave={onMouseLeave} 
            className = "relative shrink-0">
            <ol className="italic font-serif font-semibold text-blue-800 px-2 py-2 cursor-pointer hover:bg-blue-200 rounded-xl">
              Categories
              </ol>

            {isMenDropdownOpen &&(
            <ul
            style={{
              listStylePosition: "inside",
              minWidth: "200px",
              padding: "12px 20px"
            }}
           className="absolute left-0 top-full bg-white border border-zinc-200 shadow-lg rounded-xl  py-2 z-50"
           >
            <li style={{ padding: "8px 0"}}>
            <Link href="/men/t-shirts" 
            className="block px-4 py-2 w-3xl text-sm font-serif text-blue-800 hover:bg-zinc-100 whitespace-nowrap">
            T-Shirts
          </Link>
          </li>
          <li style={{ padding: "8px 0"}}>
          <Link href="/men/jackets" 
          className="block px-4 py-2 text-sm font-serif text-blue-800 hover:bg-zinc-100">
            Jackets
          </Link>
          </li>
          <li style={{ padding: "8px 0"}}>
          <Link href="/men/pants" className="block px-4 py-2 text-sm font-serif text-blue-800 hover:bg-zinc-100">
            Pants
          </Link>
          </li>
          </ul>
          )}
          
            </section>
          
          </section>
<Link href={"/auth/login"}
          className="flex justify-center items-center bg-blue-400 text-amber-50 font-serif px-5 py-2 rounded-lg whitespace-nowrap shrink-0">
            Login</Link>
          
        </nav>
</header>
    
  )
}

export default Header