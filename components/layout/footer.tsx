import React from 'react'

const Footer = () => {
  return (
    
      <footer className='w-full bg-blue-200 py-16 px-6'>
        <div className=' mx-auto'>
        

        <div className='bg-sky-6 grid grid-cols-1 items-center md:grid-cols-4 lg:grid-cols-6 gap-10'>

          <div className='p-4 '>
             <h3 className=' text-l font-serif tracking-widest uppercase mb-6 text-zinc-800 whitespace-nowrap'>The Company</h3>
              <ul className='space-y-3'>
                <li className='hover:text-blue-900  transition-colors  text-l '><a href='/about'>About</a></li>
                <li className='hover:text-blue-900 transition-colors text-l whitespace-nowrap'><a href='/products'>Our Products </a></li>
              </ul>
          </div>
        

        <div>
          <h1 className="text-white text-sm font-semibold tracking-widest uppercase mb-6">Clients</h1>
          <ul>
            <p>FAQ</p>
            <p>Track Order</p>
            <p>Delivery</p>
            <p>Payment</p>
            <p>Privacy Policy</p>
          </ul>
        </div>
       
       <div>Follow Us</div>

       <div>Contact Us</div>
        </div>
        </div>
      </footer>  
  )
}
export default Footer