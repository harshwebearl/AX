import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Breadchrumb from "../Components/Breadchrumb";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const Projects = () => {
   


  // const categories = [
  //   {
  //     name: "Architecture",
  //     thumb: "/images/project/1.jpg",
  //     photos: [
  //       "/images/project/12.jpg",
  //       "/images/project/11.jpg",
  //       "/images/project/10.jpg",
  //       "/images/project/9.jpg",
  //     ],
  //   },
  //   {
  //     name: "House Interior",
  //     thumb: "/images/project/2.jpg",
  //     photos: [
  //       "/images/project/8.jpg",
  //       "/images/project/7.jpg",
  //       "/images/project/6.jpg",
  //     ],
  //   },
  //   {
  //     name: "Office Interior",
  //     thumb: "/images/project/3.jpg",
  //     photos: [
  //       "/images/project/5.jpg",
  //       "/images/project/4.jpg",
  //     ],
  //   },
  //   {
  //     name: "Commercial Interior",
  //     thumb: "/images/project/4.jpg",
  //     photos: [
  //       "/images/project/3.jpg",
  //       "/images/project/2.jpg",
  //       "/images/project/1.jpg",
  //     ],
  //   },
   
  // ];

  const categories = [
  {
    name: "Architecture",
    thumb: "/images/project/1.jpg",
    locations: [
      {
        name: "Shivalik Heights – Ahmedabad",
        photos: [
          "/images/project/12.jpg",
          "/images/project/11.jpg",
          "/images/project/10.jpg",
        ],
      },
      {
        name: "Rajpath Villa – Gandhinagar",
        photos: [
          "/images/project/9.jpg",
          "/images/project/8.jpg",
        ],
      },
    ],
  },
  {
    name: "House Interior",
    thumb: "/images/project/2.jpg",
    locations: [
      {
        name: "3BHK Penthouse – Nikol",
        photos: [
          "/images/project/7.jpg",
          "/images/project/6.jpg",
        ],
      },
      {
        name: "5BHK Penthouse – Naroda",
        photos: [
          "/images/project/3.jpg",
          "/images/project/2.jpg",
          "/images/project/5.jpg",
        ],
      },
    ],
  },
  {
    name: "Office Interior",
    thumb: "/images/project/3.jpg",
    locations: [
      {
        name: "Corporate Office – CG Road",
        photos: [
          "/images/project/5.jpg",
          "/images/project/4.jpg",
        ],
      },
      {
        name: "Corporate Office – Prahladnagar",
        photos: [
          "/images/project/9.jpg",
          "/images/project/10.jpg",
          "/images/project/12.jpg",
        ],
      },
    ],
  },
  {
    name: "Commercial Interior",
    thumb: "/images/project/4.jpg",
    locations: [
      {
        name: "Retail Store – SG Highway",
        photos: [
          "/images/project/3.jpg",
          "/images/project/2.jpg",
          "/images/project/1.jpg",
        ],
      },
      {
        name: "Retail Store – Nikol",
        photos: [
          "/images/project/4.jpg",
          "/images/project/6.jpg",
          "/images/project/9.jpg",
        ],
      },
    ],
  },
];

 const [activeCategory, setActiveCategory] = useState(categories[0]);




  return (<>

    <Breadchrumb />
    <section className="py-20 bg-[#f7f9f9]">

  {/* Page Title */}
  <h2 className="text-center text-5xl md:text-6xl font-[Vollkorn] text-[#2C4953] font-bold mb-12">
    Our <span className="text-[#6b8c9a]">Projects</span>
  </h2>

  {/* Top Category Carousel */}
  <div className="max-w-7xl mx-auto px-6 md:px-12">
    <Swiper
      modules={[Autoplay]}
      spaceBetween={20}
      slidesPerView={2}
      slidesOffsetBefore={10}
      autoplay={{ delay: 2000, disableOnInteraction: false }}
      breakpoints={{
        640: { slidesPerView: 3 },
        768: { slidesPerView: 4 },
        1024: { slidesPerView: 4 },
      }}
      className="pb-8"
    >
      {categories.map((cat, index) => (
        <SwiperSlide key={index}>
          <div
            onClick={() => setActiveCategory(cat)}
            className={`cursor-pointer shadow-md border transition-all duration-300 
              ${activeCategory.name === cat.name
                ? "border-[#2C4953] scale-105 rounded-none"
                : "border-gray-300 hover:scale-105 rounded-xl"}`}
          >
            <img
              src={cat.thumb}
              alt={cat.name}
              className={`w-full h-28 object-cover 
                ${activeCategory.name === cat.name ? "rounded-none" : "rounded-t-xl"}`}
            />
            <div className={`p-3 text-center 
              ${activeCategory.name === cat.name ? "bg-[#253f47] rounded-none" : "bg-white rounded-b-xl"}`}>
              <p className={`font-[Vollkorn] font-semibold 
                ${activeCategory.name === cat.name ? "text-white" : "text-gray-600"}`}>
                {cat.name}
              </p>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  </div>

  {/* Multi-Location Gallery */}
  <div className="max-w-7xl mx-auto px-6 md:px-12 mt-16">

    <AnimatePresence mode="wait">
      <motion.div
        key={activeCategory.name}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6 }}
      >
        {activeCategory.locations.map((loc, locIndex) => (
          <div key={locIndex} className="mb-20">

            {/* Location Title */}
            <h3 className="text-3xl md:text-4xl font-[Vollkorn] text-[#2C4953] font-semibold mb-6 border-l-4 border-[#6b8c9a] pl-4">
              {loc.name}
            </h3>

            {/* Photo Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {loc.photos.map((img, index) => (
                <motion.div
                  key={index}
                  className="overflow-hidden rounded-xl shadow-md group"
                  whileHover={{ scale: 1.02 }}
                >
                  <img
                    src={img}
                    alt={loc.name}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-all duration-700"
                  />
                </motion.div>
              ))}
            </div>

          </div>
        ))}
      </motion.div>
    </AnimatePresence>

  </div>

</section>



  </>
  )
}

export default Projects