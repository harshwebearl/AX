import React from "react";
import { motion } from "framer-motion";
import Breadchrumb from "../Components/Breadchrumb";
import { FaCubes, FaDraftingCompass, FaHome, FaBuilding, FaPaintBrush, FaLayerGroup } from "react-icons/fa";

export default function Services() {
  const services = [
    {
      title: "Residential Architecture",
      icon: <FaHome />,
      desc: "Complete home architecture, planning, and space design tailored for modern living.",
    },
    {
      title: "Interior Designing",
      icon: <FaPaintBrush />,
      desc: "Premium interiors that blend aesthetics with functionality for homes, offices, and boutiques.",
    },
    {
      title: "Commercial Architecture",
      icon: <FaBuilding />,
      desc: "Designing business spaces that elevate brand identity and customer experience.",
    },
    {
      title: "3D Visualization",
      icon: <FaCubes />,
      desc: "High-quality 3D renders that bring your architectural vision to life with clarity.",
    },
    {
      title: "2D Layout Planning",
      icon: <FaLayerGroup />,
      desc: "Smart and precise architectural layout planning for optimized usable space.",
    },
    {
      title: "Turnkey Solutions",
      icon: <FaDraftingCompass />,
      desc: "End-to-end turnkey solutions delivering seamless planning, design, execution, and delivery with unmatched quality and reliability.",
    },
  ];

  return (<>

    <Breadchrumb page="Services" />

    <section className="py-20 bg-[#f7f9f9]">

      {/* Page Title */}
      <h2 className="text-center text-5xl md:text-6xl font-[Vollkorn] text-[#2C4953] font-bold mb-12">
        Our <span className="text-[#6b8c9a]">Services</span>
      </h2>

      {/* Subtitle */}
      <p className="text-center text-gray-600 max-w-3xl mx-auto mb-16 text-lg font-[Vollkorn] px-6">
        We provide end-to-end architectural and interior design services, delivering elegant 
        and functional solutions tailored to each client's vision.
      </p>

      {/* Services Grid */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {services.map((service, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}   
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="group bg-white rounded-2xl shadow-md border border-gray-200 p-8 text-center 
                       hover:-translate-y-2 hover:shadow-xl transition-all duration-500 flex flex-col justify-center items-center"
          >
            <div className="text-5xl text-[#2C4953] mb-6 group-hover:text-[#6b8c9a] transition-colors">
              {service.icon}
            </div>
            <h3 className="text-2xl font-[Vollkorn] text-[#2C4953] font-semibold mb-3">
              {service.title}
            </h3>
            <p className="text-gray-600 font-[Vollkorn] leading-relaxed">
              {service.desc}
            </p>
          </motion.div>
        ))}
      </div>

    </section>
    </>
  );
}
