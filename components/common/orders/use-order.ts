'use client' 

import { useMutation, useQuery, useQueryClient  } from '@tanstack/react-query';
import { createOrder, getOrderById, getMyOrders, verifyKhaltiPayment } from '@/api/order.api';

export const useCreateOrder = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createOrder,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['cart'] });
        },
    });
};

export const useVerifyKhaltiPayment = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: verifyKhaltiPayment,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['orders'] });
        },
    });
} 

export const useMyOrders = () => {
    return useQuery({
        queryKey: ['orders'],
        queryFn: getMyOrders,
    });
};

export const useOrderById = (id: string) => {
    return useQuery({
        queryKey: ['order', id],
        queryFn: () => getOrderById(id),
        enabled: !!id,
    });
}