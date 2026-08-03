import { TCreateOrderResponse, TOrder, TShippingAddress      } from '../types/order.types';
import api from '.';

export const createOrder = async (data: {
    shippingAddress: TShippingAddress;
    paymentMethod: 'COD' | 'Khalti';
}): Promise<TCreateOrderResponse> => {
    try {
        const response = await api.post('/orders', data);
        return response.data.data;
    } catch (error: any) {
        throw error?.response?.data || { message: 'An error occurred while creating the order.' };
    }
}

export const verifyKhaltiPayment = async (pidx: string): Promise<{ order: TOrder }> => {
    try {
        const response = await api.post('/orders/verify-khalti', { pidx });
        return response.data.data;
    } catch (error: any) {
        throw error?.response?.data || { message: 'An error occurred while verifying the payment.' };
    }
}

export const getOrderById = async (id: string): Promise<{ order: TOrder }> => {
    try {
        const response = await api.get(`/orders/${id}`);
        return response.data.data;
    } catch (error: any) {
        throw error?.response?.data || { message: 'An error occurred while fetching the order.' };
    }
}   

export const getOrdersById = async (): Promise<{ orders: TOrder[] }> => {
    try {
        const response = await api.get('/orders/my-orders');
        return response.data.data;
    } catch (error: any) {
        throw error?.response?.data || { message: 'An error occurred while fetching the orders.' };
    }
}