import React from 'react'
import Breadchrumb from "../Components/Breadchrumb";
import { motion } from "framer-motion";
import CostCalculator from '../Components/CostCalculator';

const Contact = () => {

  const src =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3672.06606420704!2d72.62978937436753!3d23.02134641637571!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e87c1edffa9f1%3A0xcface792ea8b83fc!2sApnaWebX!5e0!3m2!1sen!2sin!4v1763024301176!5m2!1sen!2sin";


  return (<>

    <Breadchrumb />
    <section className="relative bg-[#f7f9f9] overflow-hidden pb-20 pt-20">
      {/* Decorative Glow Background */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#6b8c9a]/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-[28rem] h-[28rem] bg-[#2C4953]/10 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Header */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-5xl md:text-6xl font-[Vollkorn] text-[#2C4953] font-bold text-center mb-6"
        >
          Get In <span className="text-[#6b8c9a]">Touch</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-gray-600 max-w-2xl mx-auto text-lg text-center mb-16 font-[Vollkorn]"
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
            <a href="tel:+91 99984 88480" > <div className="flex items-center gap-4">
              <div className="p-4 bg-[#2C4953]/10 rounded-full">
                {/* <FaPhoneAlt className="text-2xl text-[#2C4953]" /> */}
                <i className="fa-solid fa-phone-alt text-2xl text-[#2C4953]"></i>
              </div>
              <div>
                <h4 className="text-3xl font-bold font-['Tangerine'] ">Phone</h4>
                <a
                  href="tel:+91 99984 88480"
                  className="text-gray-700 hover:text-[#6b8c9a] font-[Vollkorn] transition-colors"
                >
                  +91 99984 88480
                </a>
              </div>
            </div></a>

            <a href="tel:+91 99984 88480" > <div className="flex items-center gap-4">
              <div className="p-4 bg-[#2C4953]/10 rounded-full">
                {/* <FaPhoneAlt className="text-2xl text-[#2C4953]" /> */}
                <i className="fa-solid fa-phone-alt text-2xl text-[#2C4953]"></i>
              </div>
              <div>
                <h4 className="text-3xl font-bold font-['Tangerine'] ">Phone</h4>
                <a
                  href="tel:+91 99984 88480"
                  className="text-gray-700 hover:text-[#6b8c9a] font-[Vollkorn] transition-colors"
                >
                  +91 99984 88480
                </a>
              </div>
            </div></a>

            <a href="mailto:support@apnawebx.com" > <div className="flex items-center gap-4">
              <div className="p-4 bg-[#2C4953]/10 rounded-full">
                {/* <FaEnvelope className="text-2xl text-[#2C4953]" /> */}
                <i className="fa-solid fa-envelope text-2xl text-[#2C4953]"></i>
              </div>
              <div>
                <h4 className="text-3xl font-semibold font-['Tangerine']">Email</h4>
                <a
                  href="mailto:support@apnawebx.com"
                  className="text-gray-700 hover:text-[#6b8c9a] transition-colors font-[Vollkorn]"
                >
                  support@apnawebx.com
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
                  <h4 className="text-3xl font-semibold font-['Tangerine']">Studio</h4>
                  <p className="text-gray-700 font-[Vollkorn]">
                    Nikol, Ahmedabad, Gujarat, India
                  </p>
                </div>
              </div>
            </a>

           
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
                className="bg-[#6b8c9a] text-white px-10 py-3 rounded-full font-semibold tracking-wide hover:bg-[#5b7d86] transition-all duration-300 w-full font-['Tangerine'] text-3xl"
              >
                Send Message
              </button>
            </motion.form>
          </div>
        </div>
      </div>
    </section>


    <CostCalculator />


     <section className="py-12 bg-[#f7f9f9]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <h2 className="text-3xl md:text-4xl font-[Vollkorn] text-[#2C4953] font-bold mb-6 text-center">
          Find Us On Map
        </h2>

        {/* Responsive map container (keeps aspect ratio) */}
        <div className="w-full rounded-2xl overflow-hidden shadow-lg border border-gray-200">
          <div className="relative" style={{ paddingTop: "56.25%" /* 16:9 */ }}>
            <iframe
              title="ApnaWebX location"
              src={src}
              className="absolute inset-0 w-full h-full border-0"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>



  </>
  )
}

export default Contact