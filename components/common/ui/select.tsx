import React from 'react'
import { UseFormRegister } from 'react-hook-form'
import { FaAsterisk } from "react-icons/fa"

interface Option { label: string; value: string }
interface IProps {
  label: string
  id: string
  name: string
  register: UseFormRegister<any>
  options: Option[]
  required?: boolean
  error?: string
  placeholder?: string
}

const Select = ({ label, id, name, register, options, required = false, error, placeholder = "Select..." }: IProps) => {
  return (
    <div className='w-full flex flex-col gap-1'>
      <div className='flex'>
        <label className='text-[15px] font-serif' htmlFor={id}>{label}</label>
        {required && <FaAsterisk size={8} className='text-black-400' />}
      </div>
      <select
        {...register(name)}
        id={id}
        className={`w-full border-[1.5px] tracking-wide font-extralight border-blue-600 px-2 py-2 rounded-sm ${error ? 'border-red-500 focus:outline-red-500' : 'border-blue-300 focus:outline-blue-900'}`}
      >
        <option value="">{placeholder}</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
      <p className='h-1 text-red-500 text-xs -mt-0.5'>{error}</p>
    </div>
  )
}

export default Select