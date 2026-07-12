'use client'
import Image from "next/image";
import React, { use } from "react";
import Link from "next/link";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { FaRegHeart } from "react-icons/fa";
import { IoLogOutOutline } from "react-icons/io5";
import { LuLogIn } from "react-icons/lu";
import { MdOutlineAccountCircle } from "react-icons/md";
import { useAuth } from "@/hooks/auth.hook";
import { IUser } from "@/context/auth.context";

const Navbar = () => {
  const { isAuthenticated, isLoading, logout, user } = useAuth();
  console.log(isAuthenticated, isLoading, logout, user);
  return (
    <nav className="flex justify-between h-18 py-2 px-15 bg-amber-50 items-center shadow-sm shadow-indigo-200">
      <div>
        <Image src={"/next.svg"} 
        alt="logo" 
        height={100} 
        width={100} />
      </div>

      {/*  links */}
      <div className="flex gap-3">
        <Link className="text-black/80 hover:text-indigo-500" href={"/"}>
          <span className="text-lg font-semibold text-black/80 hover:text-indigo-500 transition-all duration-300">
            Home
          </span>
        </Link>
        <Link
          className="text-black/80 hover:text-indigo-500"
          href={"/products"}
        >
          <span className="text-lg font-semibold text-black/80 hover:text-indigo-500 transition-all duration-300">
            Products
          </span>
        </Link>
        <Link className="text-black/80 hover:text-indigo-500" href={"/about"}>
          <span className="text-lg font-semibold  transition-all duration-300">
            About Us
          </span>
        </Link>
        <Link
          className="text-black/80 hover:text-indigo-500"
          href={"/contact-us"}
        >
          <span className="text-lg font-semibold text-black/80 hover:text-indigo-500 transition-all duration-300">
            Contact Us
          </span>
        </Link>
      </div>

      {/* auth & cart */}
      { isAuthenticated ? (
        <AuthUser user={user} isLoading={isLoading} logout={logout} />
      ) : (
        <AuthButtons />
      )}
    </nav>
  );
};

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
      <div className="flex gap-2 items-center">
        <Link className="mt-1" title="WishList" href={"/wishlist"}>
          <FaRegHeart className="text-indigo-500" size={24} />
        </Link>

        <Link title="Cart" href={"/cart"}>
          <HiOutlineShoppingBag />
        </Link>
      </div>

      {/* auth */}
      <div className="flex gap-2 items-center">
        {/* profile image */}
        <div className="h-14 aspect-square rounded-full overflow-clip p-0.5 border border-indigo-200">
          <Image
            src={user?.profile_image ? user?.profile_image.path : "/images/asap.webp"}
            alt="profile-image"
            height={200}
            width={200}
            loading="lazy"
            className="h-full w-full rounded-full"
          />
        </div>

        <div>
          {/* name */}
          <p className="text-lg font-semibold italic text-gray-700">John Doe</p>
          {/* logout */}
          <div
            onClick={logout}
            className="cursor-pointer  text-red-500 flex gap-1 items-center -mt-1"
          >
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
        <div className="text-white font-bold hover:bg-indigo-600 transition-all duration-300 bg-indigo-500 flex items-center gap-1 py-2 px-3 border border-indigo-500 rounded ">
          <LuLogIn size={22} />
          <p>Login</p>
        </div>
      </Link>
      <Link className="flex items-center " href={"/auth/register"}>
        <div className="text-indigo-500 font-bold  transition-all duration-300 flex items-center gap-1 py-2 px-3 border border-indigo-500 rounded ">
          <MdOutlineAccountCircle size={26} />
          <p>Register</p>
        </div>
      </Link>
    </div>
  );
};

export default Navbar;
