import React from 'react'

import { motion } from "framer-motion";

const AboutSection = () => {
  return (
    <section className="relative bg-[#f7f7f7] py-20 md:py-28 overflow-hidden">
          <div className="max-w-7xl mx-auto pt-6 px-6 md:px-12 flex flex-col lg:flex-row items-center gap-12">
            {/* Left Image Section */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative w-full lg:w-1/2"
            >
              <img
                src="/images/project/8.jpg"
                alt="Architecture Studio"
                className="rounded-2xl shadow-2xl w-full md:h-[500px] h-[300px] sm:h-[400px] object-cover"
              />
              <div className="absolute -bottom-8 md:-right-8 bg-white shadow-xl p-3 md:p-6 rounded-xl">
                <h3 className="text-4xl font-['Tangerine'] text-[#2C4953]">10+</h3>
                <p className="text-gray-600 text-sm font-semibold tracking-wide font-[Vollkorn]">
                  Years of Design Excellence
                </p>
              </div>
            </motion.div>
    
            {/* Right Content Section */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="w-full lg:w-1/2 text-left"
            >
              <h2 className="text-5xl md:text-6xl font-['Tangerine'] text-[#2C4953] font-bold mt-3 mb-6">
                About <span className="text-[#6b8c9a]">AAxiero</span>
              </h2>
              <p className="text-gray-700 text-lg leading-relaxed mb-6 font-[Vollkorn]">
                At AAxiero Design Studio, we believe that architecture is more than
                just structure — it’s the art of shaping experiences. Our designs
                merge aesthetics and functionality, bringing creativity, precision,
                and timeless elegance into every project.
              </p>
              <p className="text-gray-600 text-base leading-relaxed mb-8 font-[Vollkorn]">
                From residential masterpieces to commercial landmarks, we craft
                spaces that tell stories — rooted in innovation, sustainability, and
                the essence of modern design.
              </p>
            
              <a
                href="/about"
                className="inline-block bg-[#2C4953] text-white px-8 py-3 rounded-full font-semibold tracking-wide hover:bg-[#1e3239] transition-all duration-300 font-['Tangerine'] text-2xl"
              >
                Explore Us
              </a>
            </motion.div>
          </div>
    
          {/* Decorative Shapes */}
          <div className="absolute top-0 left-0 w-40 h-40 bg-[#2C4953]/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-60 h-60 bg-[#6b8c9a]/10 rounded-full blur-3xl"></div>
        </section>
    
  )
}

export default AboutSection