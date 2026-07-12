import  RegisterForm  from '@/components/forms/auth/register.forms';
import * as yup from "yup";

export const LoginSchema = yup.object({
    email:yup.string().email("wrong email").required(),
    password: yup.string().required()
})



export const RegisterSchema = yup.object({
    email:yup.string().email().required(),
    password:yup.string().required("password must have 6 letters"),
    full_name:yup.string().required("full_name is a required field"),
   retype_pass:yup.string().required().oneOf([yup.ref("password")],"password must match" ),
   phone:yup.string().optional().transform((value) => value?.replace(/[\s-]/g, '')).matches(/^(?:\+977)?9[6-8]\d{8}$/, {
    message:'enter a valid number',

   })

})