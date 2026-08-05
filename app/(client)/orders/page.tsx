'use client'

import Link from "next/link"
import Image from "next/image"
import { useMyOrders } from "@/components/common/orders/use-order"
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
    Failed: 'text-red-600 bg-red-50',
}

const OrdersPage = () => {
    const { data, isLoading, isError, error } = useMyOrders()
    const orders = data?.orders ?? []

    if (isLoading) {
        return (
            <div className="max-w-3xl mx-auto px-4 py-16 text-center text-sm text-gray-500">
                Loading your orders..
            </div>
        )
    }

    if (isError) {
        return (
            <div className="max-w-3xl mx-auto px-4 py-16 text-center">
                <p className="text-red-500 text-sm">
                    {(error as any)?.message ?? "Couldn't load your orders"}
                </p>
                <Link href="/" className="text-sm underline mt-4 inline-block">
                    Back to Home
                </Link>
            </div>
        )
    }

    if (orders.length === 0) {
        return (
            <div className="max-w-3xl mx-auto px-4 py-16 text-center">
                <p className="text-sm text-gray-500">You haven&apos;t placed any orders yet.</p>
                <Link href="/products" className="text-sm underline mt-4 inline-block">
                    Start shopping
                </Link>
            </div>
        )
    }

    return (
        <div className="max-w-3xl mx-auto px-4 py-16">
            <h1 className="text-xl font-semibold mb-8">My Orders</h1>

            <div className="space-y-4">
                {orders.map((order) => {
                    const firstItem = order.items[0]
                    const extraCount = order.items.length - 1

                    return (
                        <Link
                            key={order._id}
                            href={`/orders/${order._id}`}
                            className="flex gap-4 border rounded-md p-4 hover:bg-gray-50 transition-colors"
                        >
                            <div className="relative w-16 h-16 shrink-0 rounded overflow-hidden bg-gray-50">
                                {firstItem?.cover_image?.path ? (
                                    <Image
                                        src={firstItem.cover_image.path}
                                        alt={firstItem.name}
                                        fill
                                        className="object-cover"
                                    />
                                ) : (
                                    <span className="text-[10px]">No image</span>
                                    )}
                            </div>

                            <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between gap-2">
                                    <div>
                                        <p className="text-sm font-medium truncate">
                                            {firstItem?.name}
                                            {extraCount > 0 && (
                                                <span className="text-gray-500"> +{extraCount} more</span>
                                            )}
                                        </p>
                                        <p className="text-xs text-gray-500 mt-0.5">
                                            Order #{order._id.slice(-8)} &middot; {new Date(order.createdAt).toLocaleDateString()}
                                        </p>
                                    </div>
                                    <p className="text-sm font-medium whitespace-nowrap">
                                        Rs. {order.totalPrice.toLocaleString()}
                                    </p>
                                </div>

                                <div className="flex flex-wrap gap-2 mt-3">
                                    <span className={`text-xs font-medium px-3 py-1 rounded-full ${statusStyles[order.status] ?? 'text-gray-600 bg-gray-100'}`}>
                                        {order.status}
                                    </span>
                                    <span className={`text-xs font-medium px-3 py-1 rounded-full ${paymentStatusStyles[order.paymentStatus] ?? 'text-gray-600 bg-gray-100'}`}>
                                        {order.paymentMethod === 'COD' ? 'Cash on Delivery' : 'Khalti'} &middot; {order.paymentStatus}
                                    </span>
                                </div>
                            </div>
                        </Link>
                    )
                })}
            </div>
        </div>
    )
}

const Page = withAuth(OrdersPage, [Role.USER])
export default Page