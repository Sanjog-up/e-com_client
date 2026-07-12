import Image from 'next/image'
import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import { LuAsterisk, LuX } from 'react-icons/lu'

interface IProps{
    multiple?: boolean
    label:string
    required?: boolean
    id:string
    value?: File | string | undefined | File[]
    onChange: (file: File | null) => void
    error?: string
    accept?: string
}

const ImageInput = ({ multiple = false, label, required=false, id, value, onChange  , error, accept
 }:IProps) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [preview, setPreview] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false)
  const previewUrl = typeof value === 'string' ? value : value instanceof File ? URL.createObjectURL(value) : null;

  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
  //   const file = e.target.files;
  //   console.log(e.target.files);
  const onHandleChange = (e:ChangeEvent<HTMLInputElement>)=> {
    if(!e.target.files || e.target.files.length === 0)
      return
      const file = e.target.files[0]
      // if(preview) URL.revokeObjectURL(preview)
      //   setPreview(URL.createObjectURL(file))
      onChange(file)
    }
  
    useEffect(()=>{
      if(typeof value === 'string'){
        setPreview(value)
      }else if(value instanceof File){
        const url = URL.createObjectURL(value)
        setPreview(url)
        return ()=> URL.revokeObjectURL(url)
      }else{
        setPreview(null)
      }
    }, [value])



    const handleRemove = (e: React.MouseEvent) => {
      e.stopPropagation()
      if(preview) URL.revokeObjectURL(preview)
        setPreview(null)
      setIsOpen(false)
      if(inputRef.current) inputRef.current.value = ''
      onChange(null)
    }
  


    useEffect(()=>{
      if(!isOpen) return
      const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setIsOpen(false)
      window.addEventListener("keydown", onKey)
      return () => window.removeEventListener("keydown", onKey)
    }, [isOpen])
  return (
    <div>
    <div className={'flex'}>
      
        <label  htmlFor={id} className='text-[14px]'>{label}</label>
        {required && <LuAsterisk className='text-indigo-500'/>}
    </div>

    <div className=' relative border cursor-pointer border-dashed border-blue-500 h-40 rounded-md py-3 px-2'>Drag and drop or click to upload
      {/* onClick{()=> {inputRef?.current?.click()}} */}
      <p><small>Only single file allowed</small></p>
      <input
      ref={inputRef}
      type='file'
      className='cursor-pointer opacity-0 absolute inset-0 w-full h-full'
      multiple={multiple}
      // onChange={handleChange}
      onChange={onHandleChange}
      accept={accept}
      /> 
    {error && <p className='text-red-500 text-xs mt-1'>{error}</p>}

      {preview && (
        <div className='relative z-10 cursor-default h-20 w-20 rounded-sm'
          onClick={(e) => {
          e.stopPropagation()
          setIsOpen(true)
      }}
      >
        <Image
        src={preview}
        alt='preview'
        width={100}
        height={100}
        unoptimized
        className='h-full w-full object-cover rounded-sm'
        />
        <button
        type='button'
        onClick={handleRemove}
        className='absolute -top-2 -right-2 bg-black/70 text-white rounded-full w-5 h-5 flex items-center justify-center cursor-pointer'>
          <LuX size={12}/>
        </button>
          </div>)}
          
    </div>

    {isOpen && preview && (
        <div
          className='fixed inset-0 z-50 bg-black/80 flex items-center justify-center'
          onClick={() => setIsOpen(false)}
        >
          <button
            type='button'
            onClick={() => setIsOpen(false)}
            className='absolute top-4 right-4 text-white cursor-pointer'
          >
            <LuX size={28} />
          </button>
          <div
            className='relative max-w-3xl max-h-[85vh]'
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={preview}
              alt='preview large'
              width={800}
              height={800}
              unoptimized
              className='max-h-[85vh] w-auto h-auto object-contain rounded-md'
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default ImageInput