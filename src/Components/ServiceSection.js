import React from "react";
import { motion } from "framer-motion";
import { FaDraftingCompass, FaBuilding, FaCouch, FaTree } from "react-icons/fa";

export default function Gallery() {
  const Gallery = [
    {
      icon: <FaDraftingCompass className="text-4xl text-[#2C4953]" />,
      title: "Architectural Design",
      desc: "We craft innovative and timeless architectural designs that merge functionality with modern elegance, tailored to your vision.",
    },
    {
      icon: <FaBuilding className="text-4xl text-[#2C4953]" />,
      title: "Interior Planning",
      desc: "Our interiors balance beauty and practicality — designed with precision, texture, and a focus on human comfort.",
    },
    {
      icon: <FaCouch className="text-4xl text-[#2C4953]" />,
      title: "3D Visualization",
      desc: "Bring your ideas to life with realistic 3D renders that showcase every detail before construction begins.",
    },
    {
      icon: <FaTree className="text-4xl text-[#2C4953]" />,
      title: "Landscape Design",
      desc: "We integrate architecture with nature, designing serene outdoor spaces that complement the built environment perfectly.",
    },
  ];

  return (
    <section className="relative bg-[#ffffff] py-14 md:py-20 overflow-hidden bg-[url(/images/logo/service-bg.jpg)] bg-cover bg-center">
         <div className="absolute inset-0 bg-[#d5dbdd]/70"></div>

      {/* Decorative Glow */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-[#2C4953]/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#6b8c9a]/10 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 text-center relative z-10">
        {/* Section Header */}
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-5xl md:text-6xl font-['Tangerine'] text-[#2C4953] font-bold mb-6"
        >
          Our <span className="text-[#6b8c9a] ">Gallery</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="text-gray-600 max-w-2xl mx-auto text-lg mb-16 font-[Vollkorn]"
        >
          Transforming spaces with creativity, technology, and detail — we design environments that inspire modern living and timeless impressions.
        </motion.p>

        {/* Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-10 m-5 md:m-0">
          {Gallery.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 0 }}
              whileInView={{ opacity: 1, y: 40 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="bg-white border border-gray-100 shadow-lg hover:shadow-2xl rounded-2xl p-8 group hover:bg-[#2C4953] transition-all duration-500"
            >
              <div className="flex justify-center mb-6">
                <div className="p-4 bg-[#f0f4f5] rounded-full group-hover:bg-white/10 transition-all duration-500">
                  {service.icon}
                </div>
              </div>
              <h3 className="text-2xl font-semibold text-[#2C4953] mb-4 group-hover:text-white transition-colors duration-500">
                {service.title}
              </h3>
              <p className="text-gray-600 group-hover:text-gray-200 transition-colors duration-500 text-base leading-relaxed">
                {service.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
