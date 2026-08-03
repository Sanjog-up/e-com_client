import { orderSchema } from './../schema/order.schema';
import * as yup from 'yup';

export type TShippingAddress = {
    full_name: string;
    phone: string;
    address: string;
    city: string;
};

export type TOrderTinout = {
    product: string;
    quantity: number;
    price: number;
    name: string;
    cover_image: {
        path: string;
        public_id: string;
    }
}