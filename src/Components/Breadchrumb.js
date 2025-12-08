import React from "react";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";

export default function Breadcrumb() {
  
  const location = useLocation();
  const pageName = location.pathname.replace("/", "") || "home";

  const formattedName =
    pageName === "home"
      ? "Home"
      : pageName.charAt(0).toUpperCase() + pageName.slice(1).replace(/-/g, " ");

  return (
    <section className="relative w-full h-[50vh] md:h-[80vh] bg-[#f2f5f5] overflow-hidden flex items-center justify-center">
      
      {/* Background Image */}
      <img
        src="/images/logo/breadchrumb-bg.jpg"
        alt="AAxiero Design Studio"
        className="absolute inset-0 w-full h-full object-cover object-center opacity-90"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/75 backdrop-blur-[1px]"></div>

      {/* Left Glow Accent */}
      <div className="absolute -left-20 top-1/2 -translate-y-1/2 w-72 h-72 bg-[#6b8c9a]/30 rounded-full blur-3xl opacity-70"></div>

      {/* Right Glow Accent */}
      <div className="absolute -right-20 bottom-20 w-96 h-96 bg-[#2C4953]/20 rounded-full blur-3xl opacity-70"></div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 text-center px-6 mt-22"
      >
        {/* Breadcrumb Line */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-white text-2xl md:text-2xl font-[Vollkorn] font-bold drop-shadow-xl tracking-wide"
        >
          Home <span className="text-[#6b8c9a]"> / </span>
          <span className="text-[#476772]">
            {formattedName}
          </span>
        </motion.h1>

        {/* Page Title */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="text-gray-200 mt-0 text-4xl md:text-5xl max-w-2xl mx-auto leading-relaxed font-['Cormorant_Garamond']
"
        >
          {formattedName}
        </motion.p>
      </motion.div>
    </section>
  );
}
