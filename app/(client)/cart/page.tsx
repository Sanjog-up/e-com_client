'use client'

import CartItemRow from '@/components/common/cart/cartItemRow'
import withAuth from '@/hoc/withAuth.hoc'
import { useCart } from '@/hooks/useCart'
import { Role } from '@/types/enum.types'
import Link from 'next/link'
import { HiOutlineShoppingBag } from 'react-icons/hi2'

const Cart = () => {
  const { data, isLoading, isError } = useCart();
  const cart = data?.cart

  if(isLoading){
    return (
      <div className='max-w-5xl mx-auto px-4 py-16 text-center text-gray-500'>
        Loading cart...
      </div>
    )
  }

  if(isError || !cart) {
    return (
      <div className='max-w-5xl mx-auto px-4 py-16 text-center text-red-400'>
        Couldn't load your cart.Try refreshing
      </div>
    )
  }

  if(cart.items.length === 0) {
    return (
      <div className='max-w-5xl mx-auto px-4 py-24 flex flex-col items-center gap-4 text-center'>
        <HiOutlineShoppingBag className='h-16 w-16 text-gray-300'/>
        <p className='text-lg font-medium'>Your cart is empty</p>
        <Link href={"/products"}
        className='px-6 py-2 rounded-md bg-black text-white text-sm hover:bg-gray-800'
        >
          Continue Shopping
        </Link>
      </div>
    )
  }

  const subtotal = cart.items.reduce((sum, item) => sum + item.product.price * item.quantity, 0)

  return (
    <div className='max-w-5xl mx-auto px-4 py-16 grid grid-cols-1 md:grid-cols-3 gap-8'>
      <div className='md:col-span-2'>
        <h1 className='text-xl font-semibold mb-6'>Your Cart ({cart.items.length})</h1>
        <div>
          {cart.items.map((item) => (
            <CartItemRow key={item._id} item={item}/>
          ))}
        </div>
      </div>
      
      <div className='border rounded-lg p-6 h-fit sticky top-24'>
        <h2 className='font-semibold mb-4'>Order Summary</h2>
        <div className='flex justify-between text-sm mb-2'>
          <span className='text-gray-400'>SubTotal</span>
          <span>Rs. {subtotal.toLocaleString()}</span>
        </div>
        <p className='text-xs text-gray-300 mb-4'>Shipping and taxes calculated at checkout</p>
        <Link
        href="/checkout"
        className='block text-center w-full py-3 rounded-md bg-black text-white text-sm font-medium hover:bg-gray-800'
        >
          Proceed to Checkout
        </Link>
      </div>
    </div>
  )
}

const Page = withAuth(Cart, [Role.USER])
export default Page;