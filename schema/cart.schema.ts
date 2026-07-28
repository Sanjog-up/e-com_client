import * as yup from 'yup';

export const cartItemSchema = yup.object({
    product: yup.string().required("product is required"),
    quantity: yup.number().required("quantity is required").integer().min(1,"quantity must be 1 or greater" )
})

export const cartSchema = yup.object({
    user: yup.string().required("user is required"),
    items: yup.array().of(cartItemSchema).default([]).required(), 
})

export type TCartInput = yup.InferType<typeof cartSchema>;
