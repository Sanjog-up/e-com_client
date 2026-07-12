"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { FaRegHeart } from "react-icons/fa";
import { IoLogOutOutline } from "react-icons/io5";
import { LuLogIn } from "react-icons/lu";
import { MdOutlineAccountCircle } from "react-icons/md";
import { useAuth } from "@/hooks/auth.hook";
import { IUser } from "@/context/auth.context";


const Navbar = () => {
    const { isAuthenticated, isLoading, logout, user } = useAuth();
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
            className="whitespace-nowrap text-lg shrink-0 font-serif">
              <div>
              <Image
              src={"/next.svg"}
              alt="logo"
              height={100}
              width={100}/>
              </div>Grey Matter </Link>  

            <div className="flex items-center">
            <section className="flex items-center gap-2  scrollbar-hide min-w-0">
            <Link href={"/"} 
            className='italic font-serif font-semibold text-blue-800 px-2 py-2 hover:bg-blue-300 rounded-xl whitespace-nowrap shrink-0' >
            Home
            </Link>

            <Link href={"/products"} 
            className="italic font-semibold font-serif text-blue-800 px-2 py-2 hover:bg-blue-300 rounded-xl shrink-0">
            Products
            </Link>

            <Link href={"/about"} 
            className="italic font-serif font-semibold text-blue-800 px-2 py-2 shrink-0 hover:bg-blue-300 rounded-xl whitespace-nowrap">
            About Us
            </Link>

            <Link href={"/contact"} 
            className="italic font-serif shrink-0 font-semibold text-blue-800 px-2 py-2  hover:bg-blue-300 rounded-xl whitespace-nowrap">
            Contact Us
            </Link>  
            </section>        
          

          <section 
            onMouseEnter={onMouseEnter} 
            onMouseLeave={onMouseLeave} 
            className = "relative shrink-0">
            <ol className="italic font-serif font-semibold text-blue-800 px-2 shrink-0 py-2 cursor-pointer hover:bg-blue-200 rounded-xl">
              Categories
              </ol>

            {isMenDropdownOpen &&(
            <ul
            style={{
              listStylePosition: "inside",
            }}
           className="absolute left-0 top-full bg-white border-t border-zinc-200 shadow-lg rounded-xl w-full py-2 z-50 flex flex-col min-w-45"
           >
            <li >
            <Link href="/men/t-shirts" 
            className="block px-4 py-2 text-sm font-serif text-blue-800 hover:bg-zinc-100 whitespace-nowrap">
            T-Shirts
          </Link>
          </li>
          <li >
          <Link href="/men/jackets" 
          className="block px-4 py-2 text-sm font-serif text-blue-800 hover:bg-zinc-100">
            Jackets
          </Link>
          </li>
          <li >
          <Link href="/men/pants" className="block px-4 py-2 text-sm font-serif text-blue-800 hover:bg-zinc-100">
            Pants
          </Link>
          </li>
          </ul>
          )}
            </section>
            </div>

            {/* auth & cart */}
            {isAuthenticated ? <AuthUser user={user} isLoading={isLoading} logout={logout} /> : <AuthButtons />}
          
        </nav>
</header>
    )
  }

const AuthUser = ({
    user,
    isLoading,
    logout,
}: {
    user: IUser | null;
    isLoading: boolean;
    logout: () => void;
}) => {
    return (
        <div className="flex items-center gap-3">
            <div className="flex gap-2 items-center ">
                <Link className="mt-1" title="Wishlist" href={"/wishlist"}>
                    <FaRegHeart className="text-red-400 " size={22} />
                </Link>

                <Link title="Cart" href={"/cart"}>
                    <HiOutlineShoppingBag className="text-indigo-600" size={24} />
                </Link>
            </div>

            {/* auth */}
            <div className="flex gap-2 items-center">
                {/* profile image  */}
                <div className="h-14 aspect-square rounded-full overflow-clip p-0.5 border border-indigo-200">
                    <Image
                        src={user?.profile_image ? user?.profile_image.path : "/hero.jpg"}
                        alt="profile_image"
                        height={200}
                        width={200}
                        loading="lazy"
                        className="h-full w-full rounded-full object-cover object-left"
                    />
                </div>

                <div>
                    {/* name */}
                    <p className="text-lg font-semibold italic text-gray-700">{user?.full_name}</p>
                    {/* logout */}
                    <div onClick={logout} className="cursor-pointer  text-red-500 flex gap-1 items-center -mt-1">
                        <IoLogOutOutline size={22} />
                        <p className="text-sm">Logout</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

const AuthButtons = () => {
    return (
        <div className="flex gap-2 items-center">
            <Link className="flex items-center " href={"/auth/login"}>
                <div className="text-white font-bold hover:bg-blue-600 transition-all duration-300 bg-blue-500 flex items-center gap-1 py-2 px-3 border border-indigo-500 rounded ">
                    <LuLogIn size={22} />
                    <p>Login</p>
                </div>
            </Link>
            <Link className="flex items-center " href={"/auth/register"}>
                <div className="text-blue-500 font-bold  transition-all duration-300 flex items-center gap-1 py-2 px-3 border border-blue-500 rounded ">
                    <MdOutlineAccountCircle size={26} />
                    <p>Register</p>
                </div>
            </Link>
        </div>
    );
};

export default Navbar;