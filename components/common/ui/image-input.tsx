// import Image from 'next/image'
// import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
// import { LuAsterisk, LuX } from 'react-icons/lu'

// type ImageValue = File | string
// type SingleValue = ImageValue | undefined | null
// type MultiValue = ImageValue[] | undefined;

// interface IProps{
//     multiple?: boolean
//     label:string
//     required?: boolean
//     id:string
//     value?: SingleValue | MultiValue
//     onChange: (value: SingleValue | ImageValue[]) => void
//     error?: string
//     accept?: string
// }

// const ImageInput = ({ multiple = false, label, required=false, id, value, onChange  , error, accept
//  }:IProps) => {
//   const inputRef = useRef<HTMLInputElement>(null)
//   const [preview, setPreview] = useState<string | null>(null);
//   const [isOpen, setIsOpen] = useState(false)
//   const previewUrl = typeof value === 'string' ? value : value instanceof File ? URL.createObjectURL(value) : null;

//   // const handleChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
//   //   const file = e.target.files;
 
//   const onHandleChange = (e:ChangeEvent<HTMLInputElement>)=> {
//     if(!e.target.files || e.target.files.length === 0)
//       return
//       const file = e.target.files[0]
//       // if(preview) URL.revokeObjectURL(preview)
//       //   setPreview(URL.createObjectURL(file))
//       onChange(file)
//     }
  
//     useEffect(()=>{
//       if(multiple) return
//       const single = value as SingleValue
//       if(typeof single === 'string'){
//         setPreview(single)
//       }else if(single instanceof File){
//         const url = URL.createObjectURL(single)
//         setPreview(url)
//         return ()=> URL.revokeObjectURL(url)
//       }else{
//         setPreview(null)
//       }
//     }, [value, multiple])



//     const handleRemove = (e: React.MouseEvent) => {
//       e.stopPropagation()
//       if(preview) URL.revokeObjectURL(preview)
//         setPreview(null)
//       setIsOpen(false)
//       if(inputRef.current) inputRef.current.value = ''
//       onChange(null)
//     }
  
//       const [previews, setPreviews] = useState<string[]>([])
//   const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
 
//   const onHandleChangeMultiple = (e: ChangeEvent<HTMLInputElement>) => {
//     if(!e.target.files || e.target.files.length === 0) return
//     const newFiles = Array.from(e.target.files)
//     const existing = Array.isArray(value) ? (value as ImageValue[]) : []
//     onChange([...existing, ...newFiles])
//     // reset so selecting the same file again still fires onChange
//     if(inputRef.current) inputRef.current.value = ''
//   }

//    useEffect(()=>{
//     if(!multiple) return
//     const items = Array.isArray(value) ? (value as ImageValue[]) : []
//     const urls = items.map((item)=> typeof item === 'string' ? item : URL.createObjectURL(item))
//     setPreviews(urls)
//     return ()=> {
//       items.forEach((item, i)=> {
//         if(item instanceof File) URL.revokeObjectURL(urls[i])
//       })
//     }
//   }, [value, multiple])
 
//   const handleRemoveAt = (index: number) => (e: React.MouseEvent) => {
//     e.stopPropagation()
//     const items = Array.isArray(value) ? (value as ImageValue[]) : []
//     const next = items.filter((_, i)=> i !== index)
//     onChange(next)
//     setLightboxIndex(null)
//   }


//     useEffect(()=>{
//       if(!isOpen === false && lightboxIndex === null) return
//       const onKey = (e: KeyboardEvent) => {e.key === 'Escape' && setIsOpen(false) setLightboxIndex(null)}
//       window.addEventListener("keydown", onKey)
//       return () => window.removeEventListener("keydown", onKey)
//     }, [isOpen, lightboxIndex])

//     if(multiple){
//   return (
//     <div>
//     <div className={'flex'}>
      
//         <label  htmlFor={id} className='text-[14px]'>{label}</label>
//         {required && <LuAsterisk className='text-indigo-500'/>}
//     </div>

//     <div className=' relative border cursor-pointer border-dashed border-blue-500 h-40 rounded-md py-3 px-2'>
//       {/* onClick{()=> {inputRef?.current?.click()}} */}
//       <p className='w-full'><small>Drag and drop or click to upload one or more images</small></p>
//       <input
//       ref={inputRef}
//       type='file'
//       className='cursor-pointer opacity-0 absolute inset-0 w-full h-full'
//       multiple={multiple}
//       // onChange={handleChange}
//       onChange={onHandleChange}
//       accept={accept}
//       /> 
//     {error && <p className='text-red-500 text-xs mt-1'>{error}</p>}

//       {preview && (
//         <div className='relative z-10 cursor-default h-20 w-20 rounded-sm'
//           onClick={(e) => {
//           e.stopPropagation()
//           setIsOpen(true)
//       }}
//       >
//         <Image
//         src={preview}
//         alt='preview'
//         width={100}
//         height={100}
//         unoptimized
//         className='h-full w-full object-cover rounded-sm'
//         />
//         <button
//         type='button'
//         onClick={handleRemove}
//         className='absolute -top-2 -right-2 bg-black/70 text-white rounded-full w-5 h-5 flex items-center justify-center cursor-pointer'>
//           <LuX size={12}/>
//         </button>
//           </div>)}
          
//     </div>

//     {isOpen && preview && (
//         <div
//           className='fixed inset-0 z-50 bg-black/80 flex items-center justify-center'
//           onClick={() => setIsOpen(false)}
//         >
//           <button
//             type='button'
//             onClick={() => setIsOpen(false)}
//             className='absolute top-4 right-4 text-white cursor-pointer'
//           >
//             <LuX size={28} />
//           </button>
//           <div
//             className='relative max-w-3xl max-h-[85vh]'
//             onClick={(e) => e.stopPropagation()}
//           >
//             <Image
//               src={preview}
//               alt='preview large'
//               width={800}
//               height={800}
//               unoptimized
//               className='max-h-[85vh] w-auto h-auto object-contain rounded-md'
//             />
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }

// export default ImageInput


import Image from 'next/image'
import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import { LuAsterisk, LuX } from 'react-icons/lu'

type ImageValue = File | string
type SingleValue = ImageValue | undefined | null
type MultiValue = ImageValue[] | undefined

interface IProps{
    multiple?: boolean
    label:string
    required?: boolean
    id:string
    // Single mode: value is a File | string | undefined
    // Multiple mode: value is an array of File | string
    value?: SingleValue | MultiValue
    // Single mode: onChange(file) or onChange(null) to clear
    // Multiple mode: onChange(files[]) with the full updated array
    onChange: (value: SingleValue | ImageValue[]) => void
    error?: string
    accept?: string
}

const ImageInput = ({ multiple = false, label, required=false, id, value, onChange, error, accept
 }:IProps) => {
  const inputRef = useRef<HTMLInputElement>(null)

  // ---------- SINGLE FILE MODE (unchanged behavior) ----------
  const [preview, setPreview] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false)

  const onHandleChangeSingle = (e:ChangeEvent<HTMLInputElement>)=> {
    if(!e.target.files || e.target.files.length === 0)
      return
      const file = e.target.files[0]
      onChange(file)
    }

    useEffect(()=>{
      if(multiple) return
      const single = value as SingleValue
      if(typeof single === 'string'){
        setPreview(single)
      }else if(single instanceof File){
        const url = URL.createObjectURL(single)
        setPreview(url)
        return ()=> URL.revokeObjectURL(url)
      }else{
        setPreview(null)
      }
    }, [value, multiple])

    const handleRemove = (e: React.MouseEvent) => {
      e.stopPropagation()
      if(preview) URL.revokeObjectURL(preview)
        setPreview(null)
      setIsOpen(false)
      if(inputRef.current) inputRef.current.value = ''
      onChange(null)
    }

  // ---------- MULTIPLE FILE MODE ----------
  const [previews, setPreviews] = useState<string[]>([])
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const onHandleChangeMultiple = (e: ChangeEvent<HTMLInputElement>) => {
    if(!e.target.files || e.target.files.length === 0) return
    const newFiles = Array.from(e.target.files)
    const existing = Array.isArray(value) ? (value as ImageValue[]) : []
    onChange([...existing, ...newFiles])
    // reset so selecting the same file again still fires onChange
    if(inputRef.current) inputRef.current.value = ''
  }

  useEffect(()=>{
    if(!multiple) return
    const items = Array.isArray(value) ? (value as ImageValue[]) : []
    const urls = items.map((item)=> typeof item === 'string' ? item : URL.createObjectURL(item))
    setPreviews(urls)
    return ()=> {
      items.forEach((item, i)=> {
        if(item instanceof File) URL.revokeObjectURL(urls[i])
      })
    }
  }, [value, multiple])

  const handleRemoveAt = (index: number) => (e: React.MouseEvent) => {
    e.stopPropagation()
    const items = Array.isArray(value) ? (value as ImageValue[]) : []
    const next = items.filter((_, i)=> i !== index)
    onChange(next)
    setLightboxIndex(null)
  }

    useEffect(()=>{
      if(isOpen === false && lightboxIndex === null) return
      const onKey = (e: KeyboardEvent) => {
        if(e.key === 'Escape'){
          setIsOpen(false)
          setLightboxIndex(null)
        }
      }
      window.addEventListener("keydown", onKey)
      return () => window.removeEventListener("keydown", onKey)
    }, [isOpen, lightboxIndex])

  if(multiple){
    return (
      <div>
        <div className={'flex'}>
          <label htmlFor={id} className='text-[14px]'>{label}</label>
          {required && <LuAsterisk className='text-indigo-500'/>}
        </div>

        <div className='relative border cursor-pointer border-dashed border-blue-500 min-h-40 rounded-md py-3 px-2 flex flex-wrap gap-2'>
          <p className='w-full'><small>Click to upload one or more images</small></p>
          <input
            ref={inputRef}
            type='file'
            className='cursor-pointer opacity-0 absolute inset-0 w-full h-full'
            multiple
            onChange={onHandleChangeMultiple}
            accept={accept}
          />

          {previews.map((url, index)=> (
            <div key={`${url}-${index}`} className='relative z-10 cursor-default h-20 w-20 rounded-sm'
              onClick={(e)=> { e.stopPropagation(); setLightboxIndex(index) }}
            >
              <Image
                src={url}
                alt={`preview-${index}`}
                width={100}
                height={100}
                unoptimized
                className='h-full w-full object-cover rounded-sm'
              />
              <button
                type='button'
                onClick={handleRemoveAt(index)}
                className='absolute -top-2 -right-2 bg-black/70 text-white rounded-full w-5 h-5 flex items-center justify-center cursor-pointer'>
                <LuX size={12}/>
              </button>
            </div>
          ))}
        </div>
        {error && <p className='text-red-500 text-xs mt-1'>{error}</p>}

        {lightboxIndex !== null && previews[lightboxIndex] && (
          <div
            className='fixed inset-0 z-50 bg-black/80 flex items-center justify-center'
            onClick={() => setLightboxIndex(null)}
          >
            <button
              type='button'
              onClick={() => setLightboxIndex(null)}
              className='absolute top-4 right-4 text-white cursor-pointer'
            >
              <LuX size={28} />
            </button>
            <div
              className='relative max-w-3xl max-h-[85vh]'
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={previews[lightboxIndex]}
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

  return (
    <div>
    <div className={'flex'}>
        <label  htmlFor={id} className='text-[14px]'>{label}</label>
        {required && <LuAsterisk className='text-indigo-500'/>}
    </div>

    <div className=' relative border cursor-pointer border-dashed border-blue-500 h-40 rounded-md py-3 px-2'>Drag and drop or click to upload
      <p><small>Only single file allowed</small></p>
      <input
      ref={inputRef}
      type='file'
      className='cursor-pointer opacity-0 absolute inset-0 w-full h-full'
      multiple={false}
      onChange={onHandleChangeSingle}
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