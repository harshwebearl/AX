import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="relative bg-[#d5dbdd] text-[#2C4953] pt-16 pb-6 bg-[url(/images/logo/footer-bg.jpg)] bg-cover bg-center">
      <div className="absolute inset-0 bg-[#d5dbdd]/90"></div>
      {/* ===== Top Section ===== */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-12 border-b border-gray-300 pb-10">
        {/* Logo & Description */}
        <div className="flex flex-col items-start">
          <div className="flex items-center gap-2 mb-4">
            <img
              src="/images/logo/aaxiero-logo.png"
              alt="AAxiero Design Studio"
              className="h-20"
            />
            <div>
              <h1 className="text-5xl  font-bold leading-none">AAxiero</h1>
              <p className="text-3xl leading-none -mt-1">Design Studio</p>
            </div>
          </div>
          <p className="text-lg mt-4 text-gray-700 leading-relaxed max-w-sm font-[Vollkorn]">
            Our designs combine creativity, craftsmanship, and comfort for an elevated experience.
          </p>
           <div className="flex gap-6 mt-4">
              <a
                href="https://www.instagram.com/aaxiero_design_studio?igsh=bW1kMmxoMHV3MTB1"
                target="_blank"
                rel=" noreferrer"
                className="text-[#253f47] hover:text-gray font-bold transition-colors text-2xl"
              >
                <i className="fa-brands fa-instagram"></i>
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=100064026998275"
                target="_blank"
                rel=" noreferrer"
                className="text-[#253f47] hover:text-gray font-bold transition-colors text-2xl"
              >
                <i className="fa-brands fa-facebook"></i>
              </a>
              <a
                href="https://wa.me/qr/F3GB4XA7NCW4C1"
                target="_blank"
                rel=" noreferrer"
                className="text-[#253f47] hover:text-gray font-bold transition-colors text-2xl"
              >
                <i className="fa-brands fa-whatsapp"></i>
              </a>
             
            </div>
        </div>

        {/* Quick Links */}
        <div className=''>
          <h3 className="text-xl font-semibold mb-4 border-b-2 border-[#2C4953] inline-block pb-1">
            Quick Links
          </h3>
          <ul className="space-y-2 pt-5 text-gray-700 border-t text-2xl font-bold border-gray-200 font-['Cormorant_Garamond']
">
            <li><Link to="/" className="hover:text-[#2C4953] transition">Home</Link></li>
            <li><Link to="/about" className="hover:text-[#2C4953] transition">About</Link></li>
            <li><Link to="/Gallery" className="hover:text-[#2C4953] transition">Gallery</Link></li>
            <li><Link to="/projects" className="hover:text-[#2C4953] transition">Projects</Link></li>
            <li><Link to="/contact" className="hover:text-[#2C4953] transition">Contact</Link></li>
          </ul>
        </div>


        {/* Project Section */}
        <div className=''>
          <h3 className="text-xl font-semibold mb-4 border-b-2 border-[#2C4953] inline-block pb-1">
            Projects
          </h3>
          <ul className="space-y-2 pt-5 text-gray-700 border-t text-2xl font-bold border-gray-200 font-['Cormorant_Garamond']
">
            <li><Link to="/projects?category=Architecture" className="hover:text-[#2C4953] transition">Architecture</Link></li>
            <li><Link to="/projects?category=Office Interior" className="hover:text-[#2C4953] transition">Office Interior</Link></li>
            <li><Link to="/projects?category=Commercial Interior" className="hover:text-[#2C4953] transition">Commercial Interior</Link></li>
            <li><Link to="/projects?category=House Interior" className="hover:text-[#2C4953] transition">House Interior</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-xl font-semibold mb-4 border-b-2 border-[#2C4953] inline-block pb-1">
            Contact Us
          </h3>
          <div className="flex flex-col justify-center items-start gap-4 relative z-10 flex justify-center pb-4 font-['Cormorant_Garamond']
 pt-5  border-t  border-gray-200">
            <a
              href="tel:91 84604 31159"
              target="_blank"
              rel=" noreferrer"
              className="text-[#253f47] hover:text-gray font-bold transition-colors text-2xl"
            >
              <i className="fa-solid fa-phone"></i> +91 84604 31159
            </a>
            <a
              href="tel:91 81416 72731"
              target="_blank"
              rel=" noreferrer"
              className="text-[#253f47] hover:text-gray font-bold transition-colors text-2xl"
            >
              <i className="fa-solid fa-phone"></i> +91 81416 72731
            </a>
            <a
              href="mailto:aaxierodesignstudio@gmail.com"
              target="_blank"
              rel=" noreferrer"
              className="text-[#253f47] hover:text-gray font-bold transition-colors text-xl"
            >
              <i className="fa-solid fa-envelope"></i>  aaxierodesign<br className='xl:block hidden'/>studio@gmail.com
            </a>
            <a
              href="https://maps.app.goo.gl/XqGaVmG2LRR9EnAF9"
              target="_blank"
              rel=" noreferrer"
              className="text-[#253f47] hover:text-gray font-bold transition-colors text-2xl "
            >
              <i className="fa-solid fa-location-dot"></i> Nikol, Ahmedabad
            </a>

           
          </div>
        </div>
      </div>

      {/* ===== Bottom Section ===== */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 ">
        {/* 4 images */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <img src="/images/project/Footer1.jpg" alt="AAxiero Design Studio" className="rounded-lg object-cover h-32 w-full" />
          <img src="/images/project/Footer2.jpg" alt="AAxiero Design Studio" className="rounded-lg object-cover h-32 w-full" />
          <img src="/images/project/Footer3.jpg" alt="AAxiero Design Studio" className="rounded-lg object-cover h-32 w-full" />
          <img src="/images/project/Footer4.png" alt="AAxiero Design Studio" className="rounded-lg object-cover h-32 w-full" />
        </div>


        {/* Copyright */}
        <div className='flex flex-wrap justify-center md:justify-between gap-4'>
          <p className="text-center text-[#253f47] text-sm border-t border-gray-300 pt-4">
            © {new Date().getFullYear()} <strong>AAXIERO DESIGN STUDIO</strong> . All Rights Reserved.
          </p>
          <p className="text-center text-[#253f47] text-sm border-t border-gray-300 pb-0 ">
            Developed by <a href="https://www.apnawebx.com" target="_blank" rel=" noreferrer" className="hover:text-[#2C4953] font-bold">ApnaWebX</a>
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer