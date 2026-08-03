import * as yup from 'yup';

export const orderSchema = yup.object({
    full_name: yup.string().required('Full name is required'),
    phone: yup.string()
        .required('Phone number is required')
        .transform((value) => value.replace(/[\s+]/g, ''))
        .matches(/^(?:\+977)?9[6-8]\d{8}$/, 'Phone number must be 10 digits'),
    address: yup.string().required('Address is required'),
    city: yup.string().required('City is required'),
    paymentMethod: yup
        .string()
        .oneOf(['COD', 'Khalti'], 'Select a valid payment method')
        .required('Payment method is required')
})