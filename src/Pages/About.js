import React from 'react'
import { motion } from "framer-motion";

const About = () => {
  return (

    <div className='pt-18 md:pt-22'>
         <section className="relative bg-[#ffffff] py-24 md:py-32 overflow-hidden">
      {/* Background Accents */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-[#6b8c9a]/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#2C4953]/10 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col-reverse md:flex-row items-center gap-14 relative z-10">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full md:w-1/2 text-center md:text-left"
        >
          <h2 className="text-5xl md:text-6xl font-[Vollkorn] text-[#2C4953] font-bold mb-6">
            Our <span className="text-[#6b8c9a]">Design Philosophy</span>
          </h2>

          <p className="text-gray-700 text-lg leading-relaxed mb-6">
            We believe architecture is not just about structures, but experiences.  
            At <span className="font-semibold text-[#2C4953]">AAxiero Design Studio</span>, 
            every space we create tells a story — shaped by light, balance, material, and human emotion.
          </p>

          <p className="text-gray-600 text-base leading-relaxed mb-8">
            Our design approach blends artistic vision with practical innovation.  
            Each line, texture, and detail is crafted with precision — transforming everyday places into meaningful environments.
          </p>

          <div className="flex flex-wrap gap-6 mt-6">
            <div className="bg-[#2C4953] text-white px-6 py-4 rounded-xl shadow-md w-[220px] hover:bg-[#1e3239] transition-all duration-300">
              <h4 className="text-xl font-semibold mb-1 font-[Vollkorn]">Precision</h4>
              <p className="text-sm text-gray-200">Every line and detail reflects accuracy and purpose.</p>
            </div>

            <div className="bg-[#6b8c9a] text-white px-6 py-4 rounded-xl shadow-md w-[220px] hover:bg-[#557882] transition-all duration-300">
              <h4 className="text-xl font-semibold mb-1 font-[Vollkorn]">Innovation</h4>
              <p className="text-sm text-gray-200">We integrate new design ideas and sustainable concepts.</p>
            </div>

            <div className="bg-[#2C4953] text-white px-6 py-4 rounded-xl shadow-md w-[220px] hover:bg-[#1e3239] transition-all duration-300">
              <h4 className="text-xl font-semibold mb-1 font-[Vollkorn]">Harmony</h4>
              <p className="text-sm text-gray-200">Balancing aesthetics, functionality, and natural context.</p>
            </div>
          </div>
        </motion.div>

        {/* Right Image */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="relative w-full md:w-1/2"
        >
          <img
            src="/images/about/philosophy.jpg"
            alt="Architectural Design Philosophy"
            className="w-full h-[500px] object-cover rounded-2xl shadow-2xl"
          />
          <div className="absolute -bottom-6 -left-6 w-48 h-48 bg-[#6b8c9a]/20 rounded-full blur-2xl"></div>
        </motion.div>
      </div>
    </section>
    </div>
  )
}

export default About