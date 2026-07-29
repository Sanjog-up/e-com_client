import Footer from '@/components/layout/footer'
import Button from '@/components/common/ui/button'
import { HiOutlineMapPin, HiOutlinePhone, HiOutlineEnvelope, HiOutlineClock } from 'react-icons/hi2'
import { FaAsterisk } from 'react-icons/fa'

const contactDetails = [
  {
    icon: HiOutlineMapPin,
    title: 'Address',
    lines: ['Kathmandu, Nepal'],
  },
  {
    icon: HiOutlinePhone,
    title: 'Phone',
    lines: ['+977 98-10198261'],
  },
  {
    icon: HiOutlineEnvelope,
    title: 'Email',
    lines: ['sanjogm940.gmail.com'],
  },
  {
    icon: HiOutlineClock,
    title: 'Hours',
    lines: ['Sun \u2013 Fri, 10am \u2013 6pm'],
  },
]

const Contacts = () => {
  return (
    <main className='w-full'>
      {/* hero banner */}
      <div className='relative left-1/2 ml-[-50vw] w-screen h-72 sm:h-80 overflow-hidden bg-linear-to-t from-sky-500 to-indigo-500 flex flex-col items-center justify-center text-center px-6'>
        <h1 className='text-3xl sm:text-4xl font-serif tracking-widest text-white uppercase'>Contact Us</h1>
        <p className='text-sm sm:text-[15px] max-w-md text-white/90 mt-4'>
          Questions, feedback, or just want to say hi? We&apos;d love to hear from you.
        </p>
      </div>

      {/* contact section */}
      <section className='max-w-5xl mx-auto px-4 sm:px-8 py-16 grid grid-cols-1 md:grid-cols-5 gap-10'>
        {/* form */}
        <div className='md:col-span-3 bg-white rounded-sm p-6 sm:p-8 shadow-sm border border-blue-100'>
          <h2 className='text-xl font-serif tracking-widest uppercase text-zinc-800 mb-6'>Send a Message</h2>
          <form className='flex flex-col gap-5'>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-5'>
              <div className='w-full flex flex-col gap-1'>
                <div className='flex'>
                  <label className='text-[15px] font-serif' htmlFor='name'>Name</label>
                  <FaAsterisk size={8} className='text-black-400 ml-1' />
                </div>
                <input
                  id='name'
                  type='text'
                  placeholder='Your full name'
                  className='w-full border-[1.5px] tracking-wide font-extralight border-blue-300 focus:outline-blue-900 px-2 py-2 rounded-sm'
                />
              </div>
              <div className='w-full flex flex-col gap-1'>
                <div className='flex'>
                  <label className='text-[15px] font-serif' htmlFor='email'>Email</label>
                  <FaAsterisk size={8} className='text-black-400 ml-1' />
                </div>
                <input
                  id='email'
                  type='email'
                  placeholder='you@example.com'
                  className='w-full border-[1.5px] tracking-wide font-extralight border-blue-300 focus:outline-blue-900 px-2 py-2 rounded-sm'
                />
              </div>
            </div>

            <div className='w-full flex flex-col gap-1'>
              <label className='text-[15px] font-serif' htmlFor='subject'>Subject</label>
              <input
                id='subject'
                type='text'
                placeholder='What is this about?'
                className='w-full border-[1.5px] tracking-wide font-extralight border-blue-300 focus:outline-blue-900 px-2 py-2 rounded-sm'
              />
            </div>

            <div className='w-full flex flex-col gap-1'>
              <div className='flex'>
                <label className='text-[15px] font-serif' htmlFor='message'>Message</label>
                <FaAsterisk size={8} className='text-black-400 ml-1' />
              </div>
              <textarea
                id='message'
                placeholder='Write your message here...'
                className='w-full text-black font-normal border-[1.5px] min-h-40 tracking-widest border-blue-300 focus:outline-blue-900 px-2 py-2 rounded-sm'
              />
            </div>

            <div className='w-full sm:w-48'>
              <Button label='Send Message' type='button' />
            </div>
          </form>
        </div>

        {/* info cards */}
        <div className='md:col-span-2 flex flex-col gap-4'>
          {contactDetails.map(({ icon: Icon, title, lines }) => (
            <div key={title} className='flex items-start gap-4 bg-blue-100 rounded-sm p-5'>
              <Icon className='text-2xl text-blue-600 shrink-0 mt-0.5' />
              <div>
                <h3 className='font-serif tracking-wide uppercase text-zinc-800 text-sm mb-1'>{title}</h3>
                {lines.map((line) => (
                  <p key={line} className='text-sm text-zinc-600'>{line}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  )
}

export default Contacts