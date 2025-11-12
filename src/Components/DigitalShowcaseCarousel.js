import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import {  Autoplay, EffectCoverflow } from "swiper/modules";
import { motion } from "framer-motion";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";

export default function DigitalShowcaseCarousel() {
  const products = [
    {
      image: "/images/project/1.jpg",
      title: "Modern Villa Concept",
      category: "3D Visualization",
      desc: "Experience the luxury of our modern villa design — a fusion of clean geometry and nature-inspired living.",
    },
    {
      image: "/images/project/2.jpg",
      title: "Minimalist Interior Set",
      category: "Interior Design Pack",
      desc: "A curated interior set featuring neutral tones, soft textures, and elegant lighting schemes.",
    },
    {
      image: "/images/project/3.jpg",
      title: "Office Space Blueprint",
      category: "Architectural Blueprint",
      desc: "Functional layout designed to maximize efficiency and natural light.",
    },
    {
      image: "/images/project/4.jpg",
      title: "Landscape Visualization",
      category: "Outdoor Design Concept",
      desc: "Modern landscape visualization templates inspired by tranquility and harmony.",
    },
    {
      image: "/images/project/5.jpg",
      title: "Parametric Pavilion",
      category: "3D Concept Model",
      desc: "Digital concept showcasing generative design and modern structural form.",
    },
  ];

  return (
    <section className="relative bg-[#f7f9f9] py-24 md:py-32 overflow-hidden">
      {/* Background Glow Orbs */}
      <div className="absolute -top-24 left-0 w-96 h-96 bg-[#2C4953]/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-[28rem] h-[28rem] bg-[#6b8c9a]/10 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 text-center relative z-10">
        {/* Header */}
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-6xl font-[Vollkorn] text-[#2C4953] font-bold mb-6"
        >
          Digital <span className="text-[#6b8c9a]">Showcase Store</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-gray-600 max-w-2xl mx-auto text-lg mb-16"
        >
          Explore our digital design assets, 3D models, and architectural concepts — crafted to inspire and transform modern spaces.
        </motion.p>

        {/* Swiper Carousel */}
        <Swiper
          modules={[ Autoplay]}
          spaceBetween={30}
          centeredSlides={false}
          loop={true}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
          speed={1200}
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
          navigation={true}
          breakpoints={{
            0: {
              slidesPerView: 1, // 👈 Mobile
            },
            768: {
              slidesPerView: 2, // 👈 Tablet
            },
            1024: {
              slidesPerView: 3, // 👈 Desktop
            },
          }}
          className="mySwiper"
        >
          {products.map((item, index) => (
            <SwiperSlide
              key={index}
              className="w-[300px] sm:w-[400px] md:w-[450px] lg:w-[500px] bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden"
            >
              {/* Image */}
              <div className="relative overflow-hidden rounded-t-2xl">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-64 object-cover transition-transform duration-700 hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/30 opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
              </div>

              {/* Info */}
              <div className="p-6 text-left">
                <h3 className="text-2xl font-semibold text-[#2C4953] font-[Vollkorn] mb-1 hover:text-[#6b8c9a] transition-colors ">
                  {item.title}
                </h3>
                <p className="text-3xl text-gray-900 font-bold italic mb-2 font-['Tangerine']">{item.category}</p>
                <p className="text-gray-600 text-sm leading-relaxed mb-4 h-[50px] font-[Vollkorn]">{item.desc}</p>
                
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
