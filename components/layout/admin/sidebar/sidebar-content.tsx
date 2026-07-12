'use client'

import Link from 'next/link'
import { RiDashboardHorizontalFill } from "react-icons/ri";
import { FaUsers } from "react-icons/fa";
import { usePathname } from 'next/navigation';
import { AiOutlineProduct } from "react-icons/ai";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { GiLoincloth } from "react-icons/gi";
import { FcPaid } from "react-icons/fc";

const links=[
    {
        link:'/admin',
        label:'Dashboard',
        icon:<RiDashboardHorizontalFill size={26}
         />
    },
    {
        link:'/admin/brands',
        label:'Brands',
        icon:<GiLoincloth  size={26}/>
    },
    {
         link:'/admin/categories',
        label:'Categories',
        icon:<BiSolidCategoryAlt  size={26}/>
    },
    {
         link:'/admin/products',
        label:'Products',
        icon:<AiOutlineProduct  size={26}/>
    },{
         link:'/admin/users',
        label:'users',
        icon:<FaUsers  size={26}/>
    },
    {
         link:'/admin/orders',
        label:'Orders',
        icon:<FcPaid  size={26}/>
    }
]

const SidebarLinks = () => {
    const pathname = usePathname()
    console.log(pathname)
  return (
    <div className='h-full w-full flex flex-col gap-2 px-1 mt-4 '>
      {
        links.map((link)=>{
            const isActive = pathname === link.link
            return<Link 
            className={`flex items-center gap-2 border-[1.5px] hover:bg-blue-300 hover:text-white transition-all duration-300 border-cyan-300 px-2 py-3 ${isActive ? 'bg-blue-300 text-white' : "" }`} 
            href={link.link} 
            key={link.link}
            >
                {link.icon}
                <p className='font-semibold text-black/80 text-[18px]'>{link.label}</p>
            </Link>
        })
      }
    </div>
  )
}

export default SidebarLinks