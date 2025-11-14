import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Breadchrumb from "../Components/Breadchrumb";

const Gallery = () => {
   const filters = ["All", "Interior", "Architecture", "Commercial", "Landscape"];

  const images = [
    { src: "/images/project/1.jpg", category: "Interior" },
    { src: "/images/project/2.jpg", category: "Interior" },
    { src: "/images/project/3.jpg", category: "Architecture" },
    { src: "/images/project/4.jpg", category: "Commercial" },
    { src: "/images/project/5.jpg", category: "Landscape" },
    { src: "/images/project/6.jpg", category: "Architecture" },
    { src: "/images/project/7.jpg", category: "Commercial" },
    { src: "/images/project/8.jpg", category: "Landscape" },
  ];

  const [activeFilter, setActiveFilter] = useState("All");

  const filteredImages =
    activeFilter === "All"
      ? images
      : images.filter((img) => img.category === activeFilter);

  return (<>
    <Breadchrumb />
     <section className="py-20 bg-[#f7f9f9]">

      {/* Page Title */}
      <h2 className="text-center text-5xl md:text-6xl font-[Vollkorn] text-[#2C4953] font-bold mb-12">
        Our <span className="text-[#6b8c9a]">Gallery</span>
      </h2>

      {/* Filters */}
      <div className="flex justify-center gap-4 md:gap-8 mb-12 flex-wrap px-4">
        {filters.map((filter, index) => (
          <button
            key={index}
            onClick={() => setActiveFilter(filter)}
            className={`
              text-lg md:text-xl font-[Vollkorn] px-5 py-2 rounded-full border 
              transition-all duration-300
              ${activeFilter === filter 
                ? "bg-[#2C4953] text-white border-[#2C4953] shadow-md"
                : "text-[#2C4953] border-gray-400 hover:bg-[#2C4953] hover:text-white"}
            `}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredImages.map((img, index) => (
              <motion.div
                key={index}
                className="overflow-hidden rounded-xl shadow-md group"
                whileHover={{ scale: 1.02 }}
              >
                <img
                  src={img.src}
                  alt="gallery"
                  className="w-full h-64 object-cover group-hover:scale-110 transition-all duration-700"
                />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  </>
  )
}

export default Gallery