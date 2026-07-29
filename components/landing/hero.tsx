import Image from 'next/image'
import Link from 'next/link'

const Hero = () => {
  return (
      <div className='relative h-150 w-full overflow-hidden'>
        <Image
        loading='eager'
        src={'/images/asap.webp'}
        fill
        alt='hero image'
        className='object-cover'
        />
      {/* overlay */}
      <div className='absolute  inset-0 bg-black/40'></div>
      {/* content */}
      <div className='inset-0 flex flex-col items-center justify-center text-center text-white px-6 absolute'>
        {/* heading */}
        <h1 className='text-4xl font-bold'>Come here for the Best</h1>
        {/* sub heading */}
        <p className='text-[14px] max-w-md text-center mt-4'>Quality products, fair prices, and fast delivery. Explore our latest collection.</p>
          {/* button */}
          <div className='mt-6 w-50 mx-auto'>
            <Link
            onClick={() => (window.location.href = "/products")}
            label='Shop Now'
              />
          </div>
      </div>
    </div>
  )
}

export default Hero
