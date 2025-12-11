import React, { useEffect } from 'react'
import { motion } from "framer-motion";
import AchievementSection from "../Components/AchievementSection";
import Breadchrumb from "../Components/Breadchrumb";
import TestimonialsSection from '../Components/TestimonialSection';
import { FaArrowRight } from 'react-icons/fa';

const About = () => {
  useEffect(() => {
    document.title = "About AAx Kevalon Technology - Our Design Philosophy";
    
    const setMetaTag = (name, value, property = false) => {
      const selector = property ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      let meta = document.querySelector(selector);
      
      if (!meta) {
        meta = document.createElement('meta');
        if (property) {
          meta.setAttribute('property', name);
        } else {
          meta.setAttribute('name', name);
        }
        document.head.appendChild(meta);
      }
      
      meta.setAttribute('content', value);
    };

    setMetaTag('description', 'Learn about AAxiero Design Studio\'s philosophy, values, and approach to creating refined interior design and architectural spaces.');
    setMetaTag('keywords', 'AAxiero Design Studio, AAxiero Design Studio Ahmedabad, AAxiero Design Studio Nikol, Design studio in Ahmedabad, Design studio in Nikol, Interior designer in Nikol, Interior designer in Ahmedabad, Best interior designer near me, Architect in Nikol Ahmedabad, Architect near me, Top interior designer in Ahmedabad, Design studio near Nikol, Home interior designer Nikol Ahmedabad, Commercial interior designer Ahmedabad, Interior Design, Residential interior designer Ahmedabad, 2BHK interior designer Ahmedabad, 3BHK interior designer Ahmedabad, Luxury interior designer Ahmedabad, Budget interior designer Ahmedabad, Modular kitchen designer Ahmedabad, Living room interior designer Ahmedabad, Office interior designer Ahmedabad, Shop interior designer Ahmedabad, Showroom interior designer Ahmedabad, Restaurant interior designer Ahmedabad, Architectural design services Ahmedabad, Residential architecture Ahmedabad, Commercial architecture Ahmedabad, House plan designer Ahmedabad, Turnkey interior solutions Ahmedabad, Turnkey project contractor Ahmedabad, Turnkey services in Nikol, Best interior designer in Ahmedabad, Affordable interior designer Ahmedabad, Interior designer with 3D design Ahmedabad, Interior contractor in Ahmedabad, Modern home interior designer Ahmedabad, AAxiero Design Studio near Parikh Hospital, AAxiero Design Studio Nikol interior, AAxiero design and architecture studio Ahmedabad, #InteriorDesignerAhmedabad, #InteriorDesignerNikol, #ArchitectAhmedabad, #DesignStudioAhmedabad, #TurnkeySolutions, #HomeInteriorDesign, #CommercialInterior');

    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', 'https://aax.kevalontechnology.in/about');

    setMetaTag('og:type', 'website', true);
    setMetaTag('og:title', 'About AAxiero Design Studio - Our Design Philosophy', true);
    setMetaTag('og:description', 'Discover our design philosophy and approach to creating meaningful spaces', true);
    setMetaTag('og:url', 'https://aax.kevalontechnology.in/about', true);

    let schemaScript = document.querySelector('script[type="application/ld+json"][data-type="about"]');
    if (!schemaScript) {
      schemaScript = document.createElement('script');
      schemaScript.type = 'application/ld+json';
      schemaScript.setAttribute('data-type', 'about');
      document.head.appendChild(schemaScript);
    }
    schemaScript.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "AboutPage",
      "mainEntity": {
        "@type": "Organization",
        "name": "AAxiero Design Studio",
        "description": "Premium interior design and architectural visualization services with precision and innovation",
        "url": "https://aax.kevalontechnology.in",
        "knowsAbout": ["Interior Design", "Architecture", "Space Design", "Architectural Visualization"]
      }
    });
  }, []);

  return (<>

    <div className=' '>
      <section className="relative bg-[#ffffff] py-14 overflow-hidden">
        {/* Background Accents */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-[#6b8c9a]/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#2C4953]/10 rounded-full blur-3xl"></div>

        <div className="max-w-7xl mt-24 mx-auto px-6 md:px-12 flex flex-col-reverse md:flex-row items-center gap-14 relative z-10">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full md:w-1/2 text-left"
          >
            <h1 className="text-4xl md:text-5xl font-[Vollkorn] text-[#2C4953] font-bold mb-6">
              Our <span className="text-[#6b8c9a]">Design Philosophy</span>
            </h1>

            <p className="text-gray-700 text-lg leading-relaxed mb-6 font-[Vollkorn]">
              We believe architecture is not just about structures, but experiences.
              At <span className="font-semibold text-[#2C4953]">AAxiero Design Studio</span>,
              every space we create tells a story — shaped by light, balance, material, and human emotion.
            </p>

            <p className="text-gray-600 text-sm leading-relaxed mb-8 font-[Vollkorn]">
              Our design approach blends artistic vision with practical innovation.
              Each line, texture, and detail is crafted with precision — transforming everyday places into meaningful environments.
            </p>

            <div className="flex flex-wrap gap-6 mt-6">
              <div className="bg-[#253f47] text-white px-6 py-4 rounded-xl shadow-md w-[220px] hover:bg-[#476772] transition-all duration-300">
                <h3 className="text-3xl font-semibold mb-1 font-['Cormorant_Garamond']
">Precision</h3>
                <p className="text-sm text-gray-200 font-[Vollkorn]">Every line and detail reflects accuracy and purpose.</p>
              </div>

              <div className="bg-[#476772] text-white px-6 py-4 rounded-xl shadow-md w-[220px] hover:bg-[#253f47] transition-all duration-300">
                <h3 className="text-3xl font-semibold mb-1 font-['Cormorant_Garamond']
">Innovation</h3>
                <p className="text-sm text-gray-200 font-[Vollkorn]">We integrate new design ideas and sustainable concepts.</p>
              </div>


            </div>
          </motion.div>

          {/* Right Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative w-full md:w-1/2"
          >
            <img
              src="/images/project/12.jpg"
             alt="AAxiero Design Studio Interior Design Work"
              className="w-full h-[350px] md:h-[500px] object-cover rounded-2xl shadow-2xl"
            />
            <div className="absolute -bottom-6 -left-6 w-48 h-48 bg-[#6b8c9a]/20 rounded-full blur-2xl"></div>
          </motion.div>

        </div>
      </section>
    </div>


    <AchievementSection />


    <section className="relative bg-[#f7f7f7] py-10 md:pt-10 md:pb-28 overflow-hidden">
      <div className="max-w-7xl mx-auto pt-6 px-6 md:px-12 flex flex-col lg:flex-row items-center gap-12">
        {/* Left Image Section */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="relative w-full lg:w-1/2"
        >
          <img
            src="/images/project/11.jpg"
            alt="AAxiero Design Studio - Years of Excellence"
            className="rounded-2xl shadow-2xl w-full md:h-[500px] h-[300px] sm:h-[400px] object-cover"
          />
          <div className="absolute -bottom-8 md:-right-8 bg-white shadow-xl p-3 md:p-6 rounded-xl">
            <h3 className="text-4xl font-['Cormorant_Garamond']
 text-[#2C4953]">10+</h3>
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
          <h2 className="text-5xl md:text-6xl font-['Cormorant_Garamond']
 text-[#2C4953] font-bold mt-3 mb-6">
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

        </motion.div>
      </div>

      {/* Decorative Shapes */}
      <div className="absolute top-0 left-0 w-40 h-40 bg-[#2C4953]/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-60 h-60 bg-[#6b8c9a]/10 rounded-full blur-3xl"></div>
    </section>


    <TestimonialsSection />

    <section className="relative py-24 md:py-32 bg-[#ffffff] overflow-hidden">
      
      {/* Background Glow Accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#6b8c9a]/20 rounded-full blur-3xl opacity-50"></div>
      <div className="absolute bottom-0 left-0 w-[28rem] h-[28rem] bg-[#2C4953]/20 rounded-full blur-3xl opacity-40"></div>

      <div className="max-w-5xl mx-auto px-6 md:px-12 relative z-10 text-center">
        
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-4xl md:text-6xl font-[Vollkorn] font-bold text-[#2C4953] mb-6 leading-tight"
        >
          Let’s Build Your  
          <span className="text-[#6b8c9a]"> Dream Space </span>
          Together
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="text-gray-600 max-w-2xl mx-auto text-lg mb-10 font-[Vollkorn]"
        >
          Whether it's a home, commercial project, or a conceptual space —
          AAxiero Design Studio is ready to bring your vision to life with creativity and precision.
        </motion.p>

        {/* CTA Button */}
        <motion.a
          href="/contact"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="inline-flex items-center gap-3 bg-[#2C4953] text-white px-10 py-4 rounded-full font-semibold tracking-wide text-lg hover:bg-[#1f3740] transition-all duration-300 shadow-lg"
        >
          Start Your Project <FaArrowRight />
        </motion.a>

        {/* Decorative Line */}
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: 140 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="h-[2px] bg-[#2C4953]/40 mx-auto mt-10"
        ></motion.div>

      </div>
    </section>



    

  </>

  )
}

export default About