'use client'

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { orderSchema } from '@/schema/order.schema';
import { useCreateOrder, useVerifyKhaltiPayment } from '@/components/common/orders/use-order';
import { useRouter } from 'next/navigation';
import { TCheckoutInput } from '@/types/order.types';
import { useCart } from '@/hooks/useCart';
import withAuth from '@/hoc/withAuth.hoc';
import { Role } from '@/types/enum.types';


const Checkout = () => {
  const router = useRouter();
  const { data } = useCart();
  const cart = data?.cart;
  const { mutate, isPending, error } = useCreateOrder();

  const { register, handleSubmit, formState: {errors}} = useForm<TCheckoutInput>({
    defaultValues: { paymentMethod: 'COD'},
    resolver: yupResolver(orderSchema)
  })

  const subtotal = cart?.items.reduce((sum, item) => sum + item.product.price * item.quantity, 0) ?? 0;

  const onSubmit = (values: TCheckoutInput) => {
    mutate(
      {
        shippingAddress: {
          full_name: values.full_name,
          phone: values.phone,
          address: values.address,
          city: values.city
        },
        paymentMethod: values.paymentMethod as 'COD' | "Khalti",
      },
      {
        onSuccess: (res) => {
          if(res.paymentUrl){
            window.location.href = res.paymentUrl
          } else if(res.order){
            router.push(`/orders/${res.order._id}`)
          }
        }
      }
    )
  }

  if(!cart || cart.items.length === 0){
    return <div>Your cart is empty</div>
  }

  return (
    <div className='max-w-3xl mx-auto px-4 py-16 grid md:grid-cols-3 gap-8'>
      <form className='md:col-span-2 space-y-4'
      onSubmit={handleSubmit(onSubmit)}>
        <h1 className='text-xl font-semibold mb-2 '> Checkout</h1>

        <div>
          <input {...register("full_name")} placeholder='Full name' className='w-full border rounded-md p-2'/>
          {errors.full_name && <p className='text-red-400 text-xs mt-1'>{errors.full_name.message} </p>}
        </div>

        <div>
          <input {...register("phone")} placeholder='Phone (98XXXXXXXX)' className='w-full border rounded-md p-2'/>
          {errors.phone && <p className='text-red-400 text-xs mt-1'>{errors.phone.message} </p>}
        </div>

        <div>
          <input {...register("address")} placeholder='Street Address' className='w-full border rounded-md p-2'/>
          {errors.address && <p className='text-red-400 text-xs mt-1'>{errors.address.message} </p>}
        </div>

        <div>
          <input {...register("city")} placeholder='City' className='w-full border rounded-md p-2'/>
          {errors.city && <p className='text-red-400 text-xs mt-1'>{errors.city.message} </p>}
        </div>

        <div className="flex gap-6 pt-2">
          <label className='flex items-center gap-2 text-sm'>
            <input type='radio' value="COD" {...register('paymentMethod')}
            defaultChecked /> Cash on Delivery
          </label>

          <label className="flex gap-2 text-sm items-center">
            <input type='radio' value="Khalti" {...register('paymentMethod')} />
            Khalti
          </label>
        </div>

        {error && <p className='text-red-400 text-sm '>{(error as any)?.message ?? 'Something went wrong'} </p>}

        <button
        type='submit'
        disabled={isPending}
        
        className='w-full py-3 rounded-md bg-black text-white text-sm font-medium hover:bg-gray-800 disabled:opacity-50'>
          {isPending ? 'Placing Order...' : 'Place Order'}
        </button>
      </form>

      <div>
        <h2>Order Summary</h2>
        {cart.items.map((item)=> (
          <div key={item._id}>
            <span>{item.product.name} x {item.quantity}</span>
            <span>Rs. {(item.product.price * item.quantity).toLocaleString()}</span>
          </div>
        ))}
        <div>
          <span>Total</span>
          <span>Rs. {subtotal.toLocaleString()}</span>
        </div>
      </div>
    </div>
  )
}

const Page = withAuth(Checkout, [Role.USER])
export default Page
