const Footer = () => {
  return (
    
      <footer className='w-full bg-blue-200 py-16 px-6 mt-auto'>    
       <div className='max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 items-center gap-10'>
          <div>
             <h3 className=' text-l font-serif tracking-widest mb-4 text-zinc-800 whitespace-nowrap'>GREY MATTER</h3>
             <p className="text-sm text-zinc-600">Quality products for everyday life.</p>
             </div>

             <div>
              <h3 className="font-serif tracking-widest uppercase mb-4 text-zinc-800">Shop</h3>
              <ul className='space-y-2 text-sm'>
                <li><a href='/about' className="hover:text-blue-700">About</a></li>
                <li><a href='/products' className="hover:text-blue-700">Our Products </a></li>
                <li><a href="/contact-us" className="hover:text-blue-700">Contact</a></li>
              </ul>
          </div>

        <div>
          <h3 className="font-serif text-zinc-800 tracking-widest uppercase mb-4">Help</h3>
          <ul className="space-y-2 text-sm text-zinc-800">
            <p>FAQ</p>
            <li>Track Order</li>
            <li>Delivery</li>
            <li>Returns</li>
          </ul>
        </div>
       
       <div>
        <h3 className="font-serif tracking-widest uppercase mb-4 text-zinc-800">Follow Us</h3>
        <p className="text-sm text-zinc-600">hello@greymatter.example</p>
        </div>
        </div>
        <p className="text-center text-xs text-zinc-800 mt-10">© {new Date().getFullYear()} Grey Matter. All rights reserved.</p>
      </footer>  
  )
}
export default Footer