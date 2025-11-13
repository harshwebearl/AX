import React from "react";
import { motion } from "framer-motion";
import CountUp from "react-countup";
import { FaBuilding, FaUsers, FaAward, FaClock } from "react-icons/fa";

export default function StudioStatsSection() {
  const stats = [
    {
      icon: <FaBuilding className="text-4xl text-[#6b8c9a]" />,
      title: "Projects Completed",
      value: 120,
      suffix: "+",
    },
    {
      icon: <FaUsers className="text-4xl text-[#6b8c9a]" />,
      title: "Happy Clients",
      value: 85,
      suffix: "+",
    },
    {
      icon: <FaAward className="text-4xl text-[#6b8c9a]" />,
      title: "Design Awards",
      value: 12,
      suffix: "",
    },
    {
      icon: <FaClock className="text-4xl text-[#6b8c9a]" />,
      title: "Years of Experience",
      value: 10,
      suffix: "+",
    },
  ];

  return (
    <section className="relative bg-[#d5dbdd] text-white py-24 md:py-32 overflow-hidden">
        {/* Overlay */}
      {/* <div className="absolute inset-0 bg-[#d5dbdd]/80"></div> */}
      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#6b8c9a]/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-[28rem] h-[28rem] bg-[#6b8c9a]/10 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 text-center ">
        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-6xl font-[Vollkorn] font-bold mb-6"
        >
          Our <span className="text-[#6b8c9a]">Achievements</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-[#253f47] max-w-2xl mx-auto text-xl mb-16 font-[Vollkorn]"
        >
         <strong> AAxiero Design Studio</strong> has grown with a passion for precision, creativity, and excellence.  
          Every number reflects our dedication to timeless architectural experiences.
        </motion.p>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 ">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: index * 0.2 }}
              className="bg-white/10 backdrop-blur-md border border-[#253f47] hover:border-[#ffffff] rounded-xl py-10 px-6 flex flex-col items-center shadow-lg hover:shadow-[#6b8c9a]/30 transition-all duration-500 bg-[url(/images/logo/achievements-bg.jpg)]
               bg-cover bg-center cursor-pointer  "
            >
                {/* Overlay */}
      <div className="absolute inset-0 bg-[#d5dbdd]/90"></div>
              <div className="relative z-10 mb-4">{stat.icon}</div>
              <h3 className="text-5xl font-bold text-[#6b8c9a] mb-2 relative z-10">
                <CountUp end={stat.value} duration={3} />{stat.suffix}
              </h3>
              <p className="relative z-10 text-xl font-bold text-white-900 font-[Vollkorn] tracking-wide">{stat.title}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
