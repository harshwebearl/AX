import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import AboutSection from "../Components/AboutSection";
import ServiceSection from "../Components/ServiceSection";
import AchievementSection from "../Components/AchievementSection";
import DigitalShowcaseCarousel from "../Components/DigitalShowcaseCarousel";
import CostCalculator from "../Components/CostCalculator";
import { organizationSchema } from "../utils/schemaMarkup";


export default function Home() {

  const images = [
    "/images/home/carousel1.jpeg",
    "/images/home/carousel2.jpeg",
    "/images/home/carousel3.jpeg",
    "/images/home/carousel4.jpeg",
  ];

  const [index, setIndex] = useState(0);

  // Auto-change image every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans pt-18 md:pt-22 ">
      <Helmet>
        <title>AAxiero Design Studio - Premium Interior & Architectural Design</title>
        <meta name="description" content="Discover refined spaces designed with precision and creativity. Transform your vision into reality with AAxiero Design Studio. Expert interior design and architectural visualization." />
          <meta name="keywords" content="AAxiero Design Studio, AAxiero Design Studio Ahmedabad, AAxiero Design Studio Nikol, Design studio in Ahmedabad, Design studio in Nikol, Interior designer in Nikol, Interior designer in Ahmedabad, Best interior designer near me, Architect in Nikol Ahmedabad, Architect near me, Top interior designer in Ahmedabad, Design studio near Nikol, Home interior designer Nikol Ahmedabad, Commercial interior designer Ahmedabad, Interior Design, Residential interior designer Ahmedabad, 2BHK interior designer Ahmedabad, 3BHK interior designer Ahmedabad, Luxury interior designer Ahmedabad, Budget interior designer Ahmedabad, Modular kitchen designer Ahmedabad, Living room interior designer Ahmedabad, Office interior designer Ahmedabad, Shop interior designer Ahmedabad, Showroom interior designer Ahmedabad, Restaurant interior designer Ahmedabad, Architectural design services Ahmedabad, Residential architecture Ahmedabad, Commercial architecture Ahmedabad, House plan designer Ahmedabad, Turnkey interior solutions Ahmedabad, Turnkey project contractor Ahmedabad, Turnkey services in Nikol, Best interior designer in Ahmedabad, Affordable interior designer Ahmedabad, Interior designer with 3D design Ahmedabad, Interior contractor in Ahmedabad, Modern home interior designer Ahmedabad, AAxiero Design Studio near Parikh Hospital, AAxiero Design Studio Nikol interior, AAxiero design and architecture studio Ahmedabad, #InteriorDesignerAhmedabad, #InteriorDesignerNikol, #ArchitectAhmedabad, #DesignStudioAhmedabad, #TurnkeySolutions, #HomeInteriorDesign, #CommercialInterior" />
        <link rel="canonical" href="https://aax.kevalontechnology.in/" />
        
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="AAxiero Design Studio - Premium Interior & Architectural Design" />
        <meta property="og:description" content="Transform your vision into reality with expert interior design and architectural services" />
        <meta property="og:url" content="https://aax.kevalontechnology.in/" />
        <meta property="og:image" content="https://aax.kevalontechnology.in/images/og-image.jpg" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="AAxiero Design Studio" />
        <meta name="twitter:description" content="Premium Interior & Architectural Design Services" />
        <meta name="twitter:image" content="https://aax.kevalontechnology.in/images/og-image.jpg" />
        
        {/* Schema Markup */}
        <script type="application/ld+json">
          {JSON.stringify(organizationSchema)}
        </script>
      </Helmet>

      <section className="relative h-[70vh] md:h-screen flex items-center justify-center overflow-hidden bg-[url(/images/project/6.jpg)] bg-cover bg-center">
        {/* Animated Background */}
        <AnimatePresence mode="popLayout">
          <motion.div
            key={images[index]}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${images[index]})` }}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-99%" }}
            transition={{
              duration: 1.5,
              ease: "easeInOut",
            }}
          />
        </AnimatePresence>

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/50"></div>

        {/* Content */}
        <div className="relative z-10 text-center text-white px-4">
          <motion.h1
            key={index + "-heading"}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-4xl md:text-7xl font-bold font-[Vollkorn] tracking-wide drop-shadow-md"
          >
            You Dream, <br /> We Design
          </motion.h1>
          <motion.p
            key={index + "-para"}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
            className="mt-6 text-lg md:text-xl max-w-2xl mx-auto font-light tracking-wide"
          >
            We design refined spaces with precision and creativity, blending function and form to create elegant, innovative environments.
          </motion.p>

          <Link
            to="/projects"
            className="inline-block bg-white text-[#2C4953] mt-10 px-8 py-3 rounded-full font-semibold tracking-wider uppercase hover:bg-[#2C4953] hover:text-white transition duration-300"
          >
            Explore Projects
          </Link>

        </div>
        {/* Decorative Line */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-24 h-[1px] bg-white opacity-50"></div>
      </section>

      <AboutSection />
      <ServiceSection />
      <DigitalShowcaseCarousel />
      <AchievementSection />
      <CostCalculator />




      <section className="relative bg-[#f7f9f9] overflow-hidden pb-20 pt-20">
        {/* Decorative Glow Background */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#6b8c9a]/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-[28rem] h-[28rem] bg-[#2C4953]/10 rounded-full blur-3xl"></div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          {/* Header */}
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-5xl md:text-6xl font-[Vollkorn] text-[#2C4953] font-bold text-center mb-6"
          >
            Get In <span className="text-[#6b8c9a]">Touch</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
            className="text-gray-600 max-w-2xl mx-auto text-lg text-center mb-16"
          >
            Let’s collaborate to design timeless spaces that inspire. Whether it’s residential, commercial, or conceptual —
            we’d love to hear your vision.
          </motion.p>

          {/* Contact Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Left: Contact Details */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col gap-8 text-[#2C4953]"
            >
              <a href="tel:+91 84604 31159" > <div className="flex items-center gap-4">
                <div className="p-4 bg-[#2C4953]/10 rounded-full">
                  {/* <FaPhoneAlt className="text-2xl text-[#2C4953]" /> */}
                  <i className="fa-solid fa-phone-alt text-2xl text-[#2C4953]"></i>
                </div>
                <div>
                  <h4 className="text-3xl font-bold font-['Cormorant_Garamond']
 ">Jainish Faldu</h4>
                  <a
                    href="tel:+91 84604 31159"
                    className="text-gray-700 hover:text-[#6b8c9a] font-[Vollkorn] transition-colors"
                  >
                    +91 84604 31159
                  </a>
                </div>
              </div></a>

              <a href="tel:+91 81416 72731" > <div className="flex items-center gap-4">
                <div className="p-4 bg-[#2C4953]/10 rounded-full">
                  {/* <FaPhoneAlt className="text-2xl text-[#2C4953]" /> */}
                  <i className="fa-solid fa-phone-alt text-2xl text-[#2C4953]"></i>
                </div>
                <div>
                  <h4 className="text-3xl font-bold font-['Cormorant_Garamond']
 ">Apoorva Patel</h4>
                  <a
                    href="tel:+91 81416 72731"
                    className="text-gray-700 hover:text-[#6b8c9a] font-[Vollkorn] transition-colors"
                  >
                    +91 81416 72731
                  </a>
                </div>
              </div></a>

              <a href="mailto:aaxierodesignstudio@gmail.com" > <div className="flex items-center gap-4">
                <div className="p-4 bg-[#2C4953]/10 rounded-full">
                  {/* <FaEnvelope className="text-2xl text-[#2C4953]" /> */}
                  <i className="fa-solid fa-envelope text-2xl text-[#2C4953]"></i>
                </div>
                <div>
                  <h4 className="text-3xl font-semibold font-['Cormorant_Garamond']
">Email</h4>
                  <a
                    href="mailto:aaxierodesignstudio@gmail.com"
                    className="text-gray-700 hover:text-[#6b8c9a] transition-colors font-[Vollkorn]"
                  >
                    aaxierodesignstudio@gmail.com
                  </a>
                </div>
              </div>
              </a>

              <a href="/" target="_blank" >
                <div className="flex items-center gap-4">
                  <div className="p-4 bg-[#2C4953]/10 rounded-full">
                    {/* <FaLocationDot className="text-2xl text-[#2C4953]" /> */}
                    <i className="fa-solid fa-location-dot text-2xl text-[#2C4953]"></i>
                  </div>
                  <div>
                    <h4 className="text-3xl font-semibold font-['Cormorant_Garamond']
">Studio</h4>
                    <p className="text-gray-700 font-[Vollkorn]">
                      Nikol, Ahmedabad, Gujarat, India
                    </p>
                  </div>
                </div>
              </a>

              <div className="mt-10">
                <a
                  href="/contact"
                  rel="noopener noreferrer"
                  className="inline-block bg-[#2C4953] text-white px-5 md:px-10 py-3 rounded-full font-semibold tracking-wide hover:bg-[#1f3740] transition-all duration-300 font-['Cormorant_Garamond']
 text-3xl"
                >
                  Let’s Discuss Your Project
                </a>
              </div>
            </motion.div>


            <div className="relative bg-[url(/images/logo/contact-bg.jpg)] bg-cover bg-center rounded-2xl">
              {/* Right: Contact Form */}
              <div className="absolute inset-0 bg-[#d5dbdd]/80 rounded-2xl"></div>
              <motion.form
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                onSubmit={(e) => e.preventDefault()}
                className="relative z-10 bg-transparent shadow-lg rounded-2xl p-8 border border-gray-200 "
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="w-full border border-white-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-[#6b8c9a]"
                  />
                  <input
                    type="email"
                    placeholder="Your Email"
                    className="w-full border border-white-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-[#6b8c9a]"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                  <input
                    type="text"
                    placeholder="Your Phone"
                    className="w-full border border-white-300 rounded-md p-3 mb-6 focus:outline-none focus:ring-2 focus:ring-[#6b8c9a]"
                  />
                  <input
                    type="text"
                    placeholder="Subject"
                    className="w-full border border-white-300 rounded-md p-3 mb-6 focus:outline-none focus:ring-2 focus:ring-[#6b8c9a]"
                  />

                </div>

                <textarea
                  placeholder="Your Message"
                  rows="5"
                  className="w-full border border-white-300 rounded-md p-3 mb-6 focus:outline-none focus:ring-2 focus:ring-[#6b8c9a]"
                ></textarea>
                <button
                  type="submit"
                  className="bg-[#6b8c9a] text-white px-10 py-3 rounded-full font-semibold tracking-wide hover:bg-[#5b7d86] transition-all duration-300 w-full font-['Cormorant_Garamond']
 text-3xl"
                >
                  Send Message
                </button>
              </motion.form>
            </div>
          </div>
        </div>
      </section>






    </div>
  );
}
