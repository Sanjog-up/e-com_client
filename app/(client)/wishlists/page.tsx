'use client'

import WishlistItemRow from '@/components/common/wishlist/wishlistItme.row'
import withAuth from '@/hoc/withAuth.hoc'
import { useWishlist, useClearWishlist } from '@/hooks/wishlist.hook'
import { Role } from '@/types/enum.types'
import Link from 'next/link'
import { HiOutlineHeart } from 'react-icons/hi2'
import toast from 'react-hot-toast'

const WishList = () => {
  const { data, isLoading, isError } = useWishlist()
  const { mutate: clearWishlist, isPending: isClearing } = useClearWishlist()
  const wishlist = data?.wishList

  if (isLoading) {
    return (
      <div className='max-w-5xl mx-auto px-4 py-16 text-center text-gray-500'>
        Loading wishlist...
      </div>
    )
  }

  if (isError || !wishlist) {
    return (
      <div className='max-w-5xl mx-auto px-4 py-16 text-center text-red-400'>
        Couldn't load your wishlist. Try refreshing
      </div>
    )
  }

  if (wishlist.length === 0) {
    return (
      <div className='max-w-5xl mx-auto px-4 py-24 flex flex-col items-center gap-4 text-center'>
        <HiOutlineHeart className='h-16 w-16 text-gray-300' />
        <p className='text-lg font-medium'>Your wishlist is empty</p>
        <Link
          href={"/products"}
          className='px-6 py-2 rounded-md bg-black text-white text-sm hover:bg-gray-800'
        >
          Browse Products
        </Link>
      </div>
    )
  }

  const handleClear = () => {
    clearWishlist(undefined, {
      onSuccess: () => toast.success("Wishlist cleared"),
      onError: (error: any) => toast.error(error?.message || "Couldn't clear wishlist"),
    })
  }

  return (
    <div className='max-w-5xl mx-auto px-4 py-16'>
      <div className='flex items-center justify-between mb-6'>
        <h1 className='text-xl font-semibold'>Your Wishlist ({wishlist.length})</h1>
        <button
          onClick={handleClear}
          disabled={isClearing}
          className='text-sm text-gray-400 hover:text-red-500 disabled:opacity-50 transition-colors'
        >
          {isClearing ? "Clearing..." : "Clear all"}
        </button>
      </div>
      <div>
        {wishlist.map((item) => (
          <WishlistItemRow key={item._id} item={item} />
        ))}
      </div>
    </div>
  )
}

const Page = withAuth(WishList, [Role.USER])
export default Page