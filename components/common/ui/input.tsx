

import { register } from 'module';
import React from 'react'
import { UseFormRegister } from 'react-hook-form';
import { FaAsterisk } from "react-icons/fa";




interface IProps{
    label: string;
    id: string;
    type: "text" | "email" | "password" | "number" | "name";
    placeholder: string;
    name: string;
    // onChange: (e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>) => void
    register: UseFormRegister<any>
    required?: boolean
    error?: string
    multiline?: boolean
    
}

const Input = ({multiline = false, label, id, register, placeholder,name,required=false, error, type}: IProps) => {
  return (
   <div className='w-full flex flex-col gap-1'>
    <div className={'flex'}>
            <label className='text-[15px] font-serif' htmlFor={id}>
                {label}
              </label>
              {required && <FaAsterisk  size={8} className='text-black-400'/>}
              </div>
              {multiline ?

              <textarea
              {...register(name)}
              id={id}
              placeholder={placeholder}
              className={`w-full text-black font-normal border-[1.5px] min-h-60 tracking-widest border-blue-600  px-2 py-2 rounded-sm ${error ? 'border-red-500 focus:outline-red-500 ' : 'border-blue-300 focus:outline-blue-900'} `}
              
              />
              :
              <input 
              {...register(name)}
              id={id}
              // onChange={onChange}
              className={`w-full border-[1.5px] tracking-wide font-extralight border-blue-600  px-2 py-2 rounded-sm ${error ? 'border-red-500 focus:outline-red-500 ' : 'border-blue-300 focus:outline-blue-900'} `}
              type={type} 
              // name="name"            
              required={false}
              placeholder={placeholder}
              />}

              <p className='h-1 text-red-500 text-xs -mt-0.5 '>{error}</p>
          </div>

  )
}

export default Input
