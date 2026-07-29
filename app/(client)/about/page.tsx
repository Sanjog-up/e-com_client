import Image from 'next/image'
import Button from '@/components/common/ui/button'
import { HiOutlineTruck, HiOutlineShieldCheck, HiOutlineSparkles } from 'react-icons/hi2';
import Link from 'next/link'
import Footer from '@/components/layout/footer';

const values = [
{
  icon: HiOutlineSparkles,
  title: "Quality First",
  description: "Every product is checked before it reaches you."
},
{
  icon: HiOutlineTruck,
  title: "Fast Delivery",
  description: "We know waiting is thw worst part"
},
{
  icon: HiOutlineShieldCheck,
  title: "Fair Price",
  description: "Good products shouldn't cost a fortune"
}
]

const stats =[
  {label: "Happy Customers", value: "10k+"},
  {label: "Product Listed", value: "100+"},
  {label: "Cities served", value: "15+"},

]

const AboutPage = () => {
  return (
    <main className='w-full'>
      {/* hero banner */}
      <div className='relative left-1/2 ml-[-50vw] w-screen h-72 sm:h-80  overflow-hidden bg-linear-to-t from-sky-500 to-indigo-500 flex flex-col items-center justify-center text-center px-6'>
        <h1 className='text-3xl sm:text-4xl font-serif tracking-widest text-white uppercase'>About Grey Matter</h1>
        <p className='text-sm sm:text-[15px] max-w-md text-white/90 mt-4'>
          Quality products, fair prices, and fast delivery &mdash; built by people who actually use what they sell.
        </p>
      </div>
 
      {/* story section */}
      <section className=' w-full mx-auto px-4 sm:px-8 py-16 grid grid-cols-1 md:grid-cols-2 gap-10 items-center bg-mist-300'>
        <div className=' relative h-64 sm:h-80 w-full rounded-sm overflow-hidden'>
          <Image
            src={'/images/asap.webp'}
            fill
            alt='Grey Matter story'
            className='object-cover'
          />
        </div>
        <div>
          <h2 className='text-xl font-serif tracking-widest uppercase text-zinc-800 mb-4'>Our Story</h2>
          <p className='text-sm text-zinc-600 leading-relaxed mb-4'>
            Grey Matter started with a simple idea: shopping online shouldn&apos;t feel like a gamble. We were tired of
            slow deliveries, hidden costs, and products that never matched the pictures &mdash; so we built the store
            we always wanted to shop from.
          </p>
          <p className='text-sm text-zinc-600 leading-relaxed'>
            Today, we curate everyday essentials with a focus on quality and value, and ship them straight to your
            door as fast as we possibly can.
          </p>
        </div>
      </section>
 
      {/* values section */}
      <section className='relative left-1/2 ml-[-50vw] w-screen bg-blue-100 py-16 px-4 sm:px-8 '>
        <div className=' mx-auto'>
          <h2 className='text-xl font-serif tracking-widest uppercase text-zinc-800 mb-10 text-center'>What We Stand For</h2>
          <div className='grid grid-cols-1 sm:grid-cols-3 gap-8'>
            {values.map(({ icon: Icon, title, description }) => (
              <div key={title} className='bg-white rounded-sm p-6 text-center shadow-sm'>
                <Icon className='mx-auto text-3xl text-blue-600 mb-4' />
                <h3 className='font-serif tracking-wide uppercase text-zinc-800 mb-2'>{title}</h3>
                <p className='text-sm text-zinc-600 leading-relaxed'>{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
 
      {/* stats section */}
      <section className='w-screen relative left-1/2 ml-[-50vw] mx-auto px-4 sm:px-8 py-16 bg-mist-300'>
        <div className='grid grid-cols-2 sm:grid-cols-4 gap-8 text-center'>
          {stats.map(({ label, value }) => (
            <div key={label}>
              <p className='text-2xl sm:text-3xl font-bold text-blue-600'>{value}</p>
              <p className='text-xs sm:text-sm text-zinc-600 mt-1 tracking-wide uppercase'>{label}</p>
            </div>
          ))}
        </div>
      </section>
 
      {/* cta */}
      <section className='w-full bg-blue-200 py-16 px-4 sm:px-8 text-center'>
        <h2 className='text-xl font-serif tracking-widest uppercase text-zinc-800 mb-3'>Ready to Shop?</h2>
        <p className='text-sm text-zinc-600 mb-6'>Browse our latest collection and find something you&apos;ll love.</p>
        <div className='w-48 mx-auto'>
          <Link href={'/products'}>
            <Button label='Shop Now' />
          </Link>
        </div>
      </section>
 
      <Footer />
    </main>
  )
}

export default AboutPage;
