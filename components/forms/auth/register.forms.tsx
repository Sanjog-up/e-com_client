"use client";
import Button from "@/components/common/ui/button";
import Input from "@/components/common/ui/input";
import { RegisterSchema } from "@/schema/auth.schema";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { TRegisterInput } from "@/types/auth.types";
import { useMutation } from "@tanstack/react-query";
import { register as registerUser } from "@/api/auth.api";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

// interface IRegisterInput{
//   full_name:string,
//   email:string,
//   password:string,
//   retype_password:string,
//   phone?: string,
// }

const RegisterForm = () => {
  // const [full_name, setFullName] = useState('')
  // const [email,setEmail]= useState('')
  // const [password,setPassword]= useState('')
  // const [retypepassword, setRetypePassword]= useState('')

  //   const onFullNameChange = (e:React.ChangeEvent<HTMLInputElement,HTMLInputElement>)=> {
  //   console.log('full_name', e.target.value)
  //   setFullName(e.target.value)
  // }

  //  const onEmailChange = (e: React.ChangeEvent<HTMLInputElement,HTMLInputElement>)=> {
  //         console.log('email', e.target.value)
  //         setEmail(e.target.value)
  //     }

  //     const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement,HTMLInputElement>) => {
  //         console.log('password', e.target.value)
  //         setPassword(e.target.value)
  //     }

  //     const onRetypePasswordChange = (e:React.ChangeEvent<HTMLInputElement,HTMLInputElement>) => {
  //         console.log('retypepassword', e.target.value)
  //         setRetypePassword(e.target.value)
  //     }

  //     const onPhoneNumberChange = (e:React.ChangeEvent<HTMLInputElement,HTMLInputElement>) => {
  //         console.log('retype-password', e.target.value)
  //         setRetypePassword(e.target.value)
  //     }

  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      full_name: "",
      email: "",
      password: "",
      retype_pass: "",
      phone: "",
    },
    resolver: yupResolver(RegisterSchema),
  });

  // react query
  const { mutate, isPending } = useMutation({
    mutationFn: registerUser,
    onSuccess: (response) => {
      console.log("on Success", response);
      toast.success(response?.message ?? "Register Success!!");
      router.replace("/");
    },
    onError: (error) => {
      console.log("On error", error);
      toast.error(error?.message ?? "Login Failed");
    },
  });
  console.log("isPending", isPending);

  const onSubmit = async (data: TRegisterInput) => {
    mutate(data);
    // console.log('form data',data)
    // http post /auth/login
  };

  return (
    <div className="w-full">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 w-full h-full"
      >
        <Input
          register={register}
          label="Full_Name"
          type="name"
          placeholder="johndoe"
          id="full_name"
          required
          error={errors?.full_name?.message}
          name="full_name"
        />
        {/* <div className='w-full flex flex-col gap-1'>
              <label className='text-[15px] font-serif' htmlFor='full-name '>Name
              </label>
              <input id='full-name' 
              className='w-full border-[1.5px]  border-blue-600  px-2 py-2 rounded-sm'
              type='text' placeholder='John Doe'/>
            </div> */}

        <Input
          register={register}
          label="Email"
          type="text"
          placeholder="johndoe@gmail.com"
          error={errors?.email?.message}
          id="email"
          name="email"
          required
        />
        {/* <div className='w-full flex flex-col gap-1'>
            <label className='text-[15px] font-serif' htmlFor='email'>Email
              </label> 
              <input id='email'
              className='w-full border-[1.5px]  border-blue-600  px-2 py-2 rounded-sm'
              type='text' placeholder='Johndoe@gmail.com'/>
          </div> */}

        <Input
          register={register}
          label="Password"
          type="password"
          placeholder="********"
          id="password"
          required
          error={errors?.password?.message}
          name="password"
        />

        {/* <div className='w-full flex flex-col gap-1'>
           <label className='text-[15px] font-serif' htmlFor='email'>Password
             </label>
             <input id='password'
            className='w-full border-[1.5px] border-blue-500 px-2 py-2 rounded-sm'
            type='text' placeholder='Create Password'/>
          </div> */}

        <Input
          register={register}
          label="Retype-Password"
          type="password"
          placeholder="********"
          id="c_password"
          required
          error={errors?.retype_pass?.message}
          name="retype_pass"
        />

        {/* <div className='w-full flex flex-col gap-1'>
          <label className='text-[15px] font-serif' htmlFor='password'>Username</label>
          <input id='username'
          className='w-full border-[1.5px] border-blue-500 px-2 py-2 rounded-sm'
          type='text' placeholder='Username'
          />
          </div> */}

        <Input
          label="PhoneNumber"
          type="text"
          placeholder="98********"
          error={errors?.phone?.message}
          id="phonenumber"
          name="phone"
          register={register}
        />

        {/* Button */}
        <Button label="Sign Up" type="submit" />
      </form>
    </div>
  );
};

export default RegisterForm;
