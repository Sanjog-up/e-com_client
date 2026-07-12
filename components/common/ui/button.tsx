import React from 'react'

interface IButtonProps {
   label: string,
    type?: 'reset' | 'submit' | 'button' ;
     isLoading?: boolean;
  disabled?: boolean;
}
const Button = ({ label= 'Button', type = 'button', isLoading, disabled, ...rest }: IButtonProps) => {
  return (
    <div>
      <button type={type}
      disabled={isLoading || disabled}
      {...rest}
          className='w-full h-full bg-linear-to-t from-sky-500 to-indigo-500 py-2.5 rounded-sm cursor-pointer text-amber-50 font-bold '>
          
            {isLoading ? "Submitting.." : label}

          </button >
    </div>
  )
}

export default Button
