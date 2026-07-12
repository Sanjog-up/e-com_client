'use client'

import Button from '@/components/common/ui/button';
import Input from '@/components/common/ui/input';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { CgPassword } from 'react-icons/cg';
import {LoginSchema} from '@/schema/auth.schema';
import axios from 'axios';
import { TLoginInput } from '@/types/auth.types';
import { login } from '@/api/auth.api';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast'

export const LoginForm = () =>{
    // const[email,setEmail]= useState('')
    // const[password, setPassword]= useState('')

    // const[formData, setFormData] = useState<{ email:string, password: string}>({
    //     email: "",
    //     password:''
    // })

    // const onChange = (e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>)=>{
    //     console.log(formData)
    //     setFormData({...formData, [e.target.value]: e.target.value})
    // }
     const router = useRouter()

    const {register, handleSubmit, formState:{errors,  }} = useForm({
        defaultValues:{
            email: "",
            password: ""
        },
        resolver: yupResolver(LoginSchema)
    })


    // reactquery
    const { mutate, isPending } = useMutation({
        mutationFn: login,
        onSuccess: (response) => {
            console.log('on Success', response)
            toast.success(response?.message ?? 'Login Success!!')
            router.replace('/')

        },
        onError: (error) =>
        {
            console.log('on Error', error)
            toast.error(error?.message ?? 'Login Failed')
        }
    })
 console.log("is Pending", isPending)


    const onSubmit = async (data: TLoginInput) => {
        mutate(data)
        // try {
        //     const response = await login(data)
        //     console.log(response)
        // } catch (error) {
        //     console.log(error)
        // }
    }
    console.log(errors)

    // const onEmailChange = (e: React.ChangeEvent<HTMLInputElement,HTMLInputElement>)=> {
    //     console.log('email', e.target.value)
    //     setEmail(e.target.value)
    // }
     
    // const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement,HTMLInputElement>) => {
    //     console.log('password', e.target.value)
    //     setPassword(e.target.value)
    // }

    // const onSubmit = (data: {email: string;password:string}) => {
    //     console.log('form data',data)
    //     // http post /auth/login
    // }

  return (
    <div className='w-full'>
   <form 
   onSubmit={handleSubmit(onSubmit)}
   className='flex flex-col gap-4 w-full'>
               
                <Input
                register={register}
                name='email'
                // onChange={onchange}
                label={'Email'}
                id='email'
                placeholder='johndoe@gmail.com'
                required
                error={errors?.email?.message}
                type='text'/>


                {/* <div className='w-full flex flex-col gap-1'>
                <label htmlFor='password' className='text-[14px] font-medium'>
                        Password
                    </label>
                    <input 
                    id='password'
                    className='w-full border-[1.5px] border-indigo-500 px-2 py-2 rounded-sm '
                    type='password' placeholder='password'/>
                </div> */}
                <Input
                // onChange={onChange}
                register={register}
                name='password'
                label='Password'
                placeholder='******'
                id='password'
                required
                type='password'
                error={errors?.password?.message}
                />
    
                {/* <button 
                type='submit'
                className='w-full bg-linear-to-t from-sky-500 to-indigo-500 py-2.5 rounded-sm cursor-pointer text-amber-50 font-bold mt-3'
                >
                    Sign In
                </button> */}
                <Button
                label={isPending ? 'Signing In..' : 'Sign In'} 
                type='submit'/>
                        </form>
</div>

                )}
