'use client'

import { useParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { useOrderById } from "@/components/common/orders/use-order"
import withAuth from "@/hoc/withAuth.hoc"
import { Role } from "@/types/enum.types"

const statusStyles: Record<string, string> = {
    Pending: 'text-amber-600 bg-amber-50',
    Processing: 'text-blue-600 bg-blue-50',
    Shipped: 'text-indigo-600 bg-indigo-50',
    Delivered: 'text-green-600 bg-green-50',
    Cancelled: 'text-red-600 bg-red-50',
}

const paymentStatusStyles: Record<string, string> = {
    Pending: 'text-amber-600 bg-amber-50',
    Paid: 'text-green-600 bg-green-50',
    Failed: 'text-red-600 bg-red-50'
}

const OrderConfirmation = () => {
    const {id} = useParams<{id: string}>()
    const { data, isLoading, isError, error} = useOrderById(id)
    const order = data?.order;

    if(isLoading){
        return <div className="max-w-3xl mx-auto px-4 py-16 text-center text-sm text-gray-500">
            Loading your order..</div>
    }

    if(isError || !order) {
        return(
            <div className="max-w-3xl mx-auto px-4 py-16 text-center">
                <p className="text-red-500 text-sm">
                    {(error as any)?.message ?? "Couldn't find order"}
                </p>
                <Link href="/" className="text-sm underline mt-4 inline-block">
                Back to Home
                </Link>
            </div>
        )
    }

    return (
        <div className="max-w-3xl mx-auto px-4 py-16">
            <div className="text-center mb-10">
                <h1 className="font-bold font-serif text-3xl">Order Placed</h1>
                <p className="text-lg text-gray-900">Order #{order?._id}</p>
            </div>

            <div className="flex flex-wrap gap-3 mb-6">
                <span  className={`text-xs font-medium px-3 py-1 rounded-full ${statusStyles[order.status] ?? 'text-gray-600 bg-gray-100'}`}>
                    {order?.status}
                </span>
                <span className={`text-xs font-medium px-3 py-1 rounded-full ${paymentStatusStyles[order.paymentStatus] ?? 'text-gray-600 bg-gray-100'}`}>
                    {order?.paymentMethod === 'COD' ? 'Cash on Delivery' : 'Khalti'} ∙ {order?.paymentStatus}
                </span>
            </div>

            <div className="border max-h-48  rounded-md divide-y mb-6">
                {order?.items.map((item, idx) => (
                    <div key={`${item.product}-${idx}`} className="flex gap-3 p-4"> 
                        <div className="relative w-16 h-16 flex shrink-0 rounded overflow-hidden bg-gray-50">
                            <Image
                            src={item.cover_image.path} alt={item.name}
                            fill
                            className="object-cover"
                            />
                            
                            </div>
                            <div className="flex justify-between items-center pt-7 mb-6 space-x-28">
                                <p className="text-sm font-bold">{item.name}</p>
                                <span className="text-xs font-bold">Qty: {item.quantity}</span>
                                <span>
                                    <button className="bg-red-300 rounded-xl right-full">
                                Cancel Order
                                </button>
                                </span>
                            
                            <p className="text-sm font-medium">
                                Rs. {(item.price * item.quantity).toLocaleString()}</p>
                            </div>
                            
                    </div>
                    
                ))}
            </div>

             <div className="border rounded-md p-4 mb-6">
                <h2 className="text-lg font-medium mb-2">Shipping to</h2>
                <p className="text-lg text-gray-900">{order.shippingAddress.full_name}</p>
                <p className="text-lg text-gray-900">{order.shippingAddress.phone}</p>
                <p className="text-lg text-gray-900">{order.shippingAddress.address}, {order.shippingAddress.city}</p>
            </div>
 
            <div className="flex justify-between items-center border-t pt-4 mb-8">
                <span className="text-sm font-medium">Total</span>
                <span className="text-lg font-semibold">Rs. {order.totalPrice.toLocaleString()}</span>
            </div>
        
            <div className="flex justify-center gap-4 text-sm">
                <Link href="/products" className="underline">Continue shopping</Link>
                <Link href="/orders" className="underline">View all orders</Link>
            </div>
        </div>
        )
}

const Page = withAuth(OrderConfirmation, [Role.USER])
export default Page