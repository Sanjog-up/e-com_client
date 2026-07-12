import Image from 'next/image'
import Button from '../common/ui/button'

const Hero = () => {
  return (
    <div>
      
      <div className='relative h-150 w-full overflow-hidden'>
        <Image
        loading='eager'
        src={'/images/asap.webp'}
        fill
        alt='hero image'
        className='object-cover'
        />
      </div>
      {/* overlay */}
      <div className='absolute  inset-0 bg-black/40'></div>
      {/* content */}
      <div className='inset-0 flex flex-col items-center justify-center text-center text-white px-6 absolute'>
        {/* heading */}
        <h1 className='text-4xl font-bold'>Come here for the Best</h1>
        {/* sub heading */}
        <p className='text-[14px] max-w-md text-center mt-4'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus alias beatae voluptas inventore laudantium saepe culpa nemo rem aliquid nihil assumenda consequatur hic sequi repellendus reprehenderit perspiciatis, facere animi? Eaque?</p>
          {/* button */}
          <div className='mt-6 w-50 mx-auto'>
            <Button
            label='Shop Now'
            />
          </div>
      </div>
    </div>
  )
}

export default Hero
