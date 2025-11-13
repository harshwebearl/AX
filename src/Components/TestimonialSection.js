import React from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

export default function TestimonialsSection() {
    const testimonials = [
        {
            name: "Rohit Patel",
            text: "AAxiero Design Studio completely transformed our home. Their attention to detail, creativity, and professionalism exceeded all expectations.",
        },
        {
            name: "Kavya Shah",
            text: "Elegant, functional, and beautifully executed. The design captured our brand perfectly. Highly recommended for premium interior projects.",
        },
        {
            name: "Harshil Mehta",
            text: "Their design philosophy brings life to spaces. Every corner feels intentional and thoughtfully crafted. Great experience working with them.",
        },
    ];

    return (
        <section className="relative pt-24 pb-20 md:py-20 bg-[#f7f9f9] overflow-hidden bg-[url(/images/logo/testimonial-bg.jpg)] bg-cover bg-center">
            {/* Overlay */}
            <div className="absolute inset-0 bg-[#d5dbdd]/80"></div>



            {/* Background Glow */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-[#6b8c9a]/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-[28rem] h-[28rem] bg-[#2C4953]/10 rounded-full blur-3xl"></div>

            <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 text-center">
                {/* Title */}
                <motion.h2
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-4xl md:text-6xl font-[Vollkorn] text-[#2C4953] font-bold mb-6"
                >
                    What Our <span className="text-[#6b8c9a]">Clients Say</span>
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    className="text-gray-600 max-w-2xl mx-auto text-lg mb-16 font-[Vollkorn]"
                >
                    AAxiero Design Studio is trusted by homeowners, builders, and commercial clients
                    for delivering timeless and functional spaces with a personal touch.
                </motion.p>

                {/* Swiper Carousel */}
                <Swiper
                    modules={[Autoplay]}
                    spaceBetween={40}
                    slidesPerView={1}
                    autoplay={{ delay: 3500 }}
                    pagination={{ clickable: true }}
                    breakpoints={{
                        768: { slidesPerView: 2 },
                        1024: { slidesPerView: 3 },
                    }}
                    className="pb-10"
                >
                    {testimonials.map((item, index) => (
                        <SwiperSlide key={index}>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="relative bg-white rounded-2xl shadow-md p-8 border border-gray-200 text-left h-full hover:shadow-xl transition-shadow duration-300"
                            >
                                {/* Profile */}
                                <div className="flex items-center gap-4 mb-4">

                                    <div>
                                        <h4 className="text-2xl font-semibold text-[#2C4953] font-[Vollkorn]">
                                            {item.name}
                                        </h4>
                                    </div>
                                </div>

                                {/* Review */}
                                <p className="text-gray-700 leading-relaxed text-sm md:text-base font-[Vollkorn]">
                                    “{item.text}”
                                </p>
                            </motion.div>
                            {/* Decorative Architect Icon */}
                            <div className="absolute top-6 right-6 z-10 opacity-50">
                                <i className="fa-solid fa-compass-drafting text-[160px] text-[#2C4953] rotate-6"></i>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
}
