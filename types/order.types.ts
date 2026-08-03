import { orderSchema } from './../schema/order.schema';
import * as yup from 'yup';

export type TShippingAddress = {
    full_name: string;
    phone: string;
    address: string;
    city: string;
};

export type TOrderItem = {
    product: string;
    quantity: number;
    price: number;
    name: string;
    cover_image: {
        path: string;
        public_id: string;
    }
}

export type TOrder = {
    user: string;
    _id: string;
    items: TOrderItem[];
    shippingAddress: TShippingAddress;
    paymentMethod: 'COD' | 'Khalti';
    paymentStatus: 'Pending' | 'Paid' | 'Failed';
    khaltiPidx?: string;
    totalPrice: number;
    status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
    createdAt: string;
    updatedAt: string;
};

export type TCheckoutInput = yup.InferType<typeof orderSchema>;

export type TCreateOrderResponse = {
    order?: TOrder;
    paymentUrl?: string;
    orderId?: string;
};