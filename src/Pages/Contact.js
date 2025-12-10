import React, { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async';
import Breadchrumb from "../Components/Breadchrumb";
import { motion } from "framer-motion";
import CostCalculator from '../Components/CostCalculator';
import emailjs from '@emailjs/browser';

const Contact = () => {
  const src =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3671.481267715443!2d72.67345587224087!3d23.042811069535833!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e872afbed72a5%3A0x26f8538d2d1da325!2sAAxiero%20design%20studio!5e0!3m2!1sen!2sin!4v1763183911976!5m2!1sen!2sin";

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Initialize EmailJS
  useEffect(() => {
    emailjs.init('MmO--L7IF2RZe3SHg');
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await emailjs.send(
        'service_ee2hugz',
        'template_30ul3wm',
        {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          subject: formData.subject,
          message: formData.message
        }
      );

      if (result.status === 200) {
        setSubmitted(true);
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: ''
        });
        setTimeout(() => setSubmitted(false), 3000);
      }
    } catch (error) {
      console.error('Failed to send email:', error);
      alert('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };


  return (<>
    <Helmet>
      <title>Contact AAx Kevalon Technology - Get In Touch</title>
      <meta name="description" content="Contact AAx Kevalon Technology for your interior design and architectural projects. Phone, email, and contact form available." />
      <meta name="keywords" content="AAxiero Design Studio, AAxiero Design Studio Ahmedabad, AAxiero Design Studio Nikol, Design studio in Ahmedabad, Design studio in Nikol, Interior designer in Nikol, Interior designer in Ahmedabad, Best interior designer near me, Architect in Nikol Ahmedabad, Architect near me, Top interior designer in Ahmedabad, Design studio near Nikol, Home interior designer Nikol Ahmedabad, Commercial interior designer Ahmedabad, Interior Design, Residential interior designer Ahmedabad, 2BHK interior designer Ahmedabad, 3BHK interior designer Ahmedabad, Luxury interior designer Ahmedabad, Budget interior designer Ahmedabad, Modular kitchen designer Ahmedabad, Living room interior designer Ahmedabad, Office interior designer Ahmedabad, Shop interior designer Ahmedabad, Showroom interior designer Ahmedabad, Restaurant interior designer Ahmedabad, Architectural design services Ahmedabad, Residential architecture Ahmedabad, Commercial architecture Ahmedabad, House plan designer Ahmedabad, Turnkey interior solutions Ahmedabad, Turnkey project contractor Ahmedabad, Turnkey services in Nikol, Best interior designer in Ahmedabad, Affordable interior designer Ahmedabad, Interior designer with 3D design Ahmedabad, Interior contractor in Ahmedabad, Modern home interior designer Ahmedabad, AAxiero Design Studio near Parikh Hospital, AAxiero Design Studio Nikol interior, AAxiero design and architecture studio Ahmedabad, #InteriorDesignerAhmedabad, #InteriorDesignerNikol, #ArchitectAhmedabad, #DesignStudioAhmedabad, #TurnkeySolutions, #HomeInteriorDesign, #CommercialInterior" />
      <link rel="canonical" href="https://aax.kevalontechnology.in/contact" />
      
      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content="Contact AAxiero Design Studio" />
      <meta property="og:description" content="Get in touch with our design experts for your next project" />
      <meta property="og:url" content="https://aax.kevalontechnology.in/contact" />
      
      {/* Schema - Contact Page */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ContactPage",
          "name": "Contact AAxiero Design Studio",
          "mainEntity": {
            "@type": "Organization",
            "name": "AAxiero Design Studio",
            "telephone": "+91-8460431159",
            "email": "aaxierodesignstudio@gmail.com",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Nikol",
              "addressRegion": "Gujarat",
              "addressCountry": "IN"
            }
          }
        })}
      </script>
    </Helmet>

    <Breadchrumb />
    <section className="relative bg-[#f7f9f9] overflow-hidden pb-20 pt-20">
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#6b8c9a]/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-[28rem] h-[28rem] bg-[#2C4953]/10 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Header */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-5xl md:text-6xl font-[Vollkorn] text-[#2C4953] font-bold text-center mb-6"
        >
          Get In <span className="text-[#6b8c9a]">Touch</span>
        </motion.h1>

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
            <a href="tel:+91 84604 31159" > <div className="flex items-center gap-4">
              <div className="p-4 bg-[#2C4953]/10 rounded-full">
                {/* <FaPhoneAlt className="text-2xl text-[#2C4953]" /> */}
                <i className="fa-solid fa-phone-alt text-2xl text-[#2C4953]"></i>
              </div>
              <div>
                <h4 className="text-3xl font-bold font-['Cormorant_Garamond']">Jenish Faldu</h4>
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
                <h4 className="text-3xl font-bold font-['Cormorant_Garamond'] ">Apoorva Patel</h4>
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
                <h4 className="text-3xl font-semibold font-['Cormorant_Garamond']">Email</h4>
                <a
                  href="mailto:aaxierodesignstudio@gmail.com"
                  className="text-gray-700 hover:text-[#6b8c9a] transition-colors font-[Vollkorn]"
                >
                  aaxierodesignstudio@gmail.com
                </a>
              </div>
            </div>
            </a>

            <a href="https://maps.app.goo.gl/XqGaVmG2LRR9EnAF9" target="_blank" rel="noreferrer">
              <div className="flex items-center gap-4">
                <div className="p-4 bg-[#2C4953]/10 rounded-full">
                  {/* <FaLocationDot className="text-2xl text-[#2C4953]" /> */}
                  <i className="fa-solid fa-location-dot text-2xl text-[#2C4953]"></i>
                </div>
                <div>
                  <h4 className="text-3xl font-semibold font-['Cormorant_Garamond']">Studio</h4>
                  <p className="text-gray-700 font-[Vollkorn]">
                    407, Sankalp Icon, Opp. Parikh Hospital, Nikol, Ahmedabad, 382350.
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
              onSubmit={handleSubmit}
              className="relative z-10 bg-transparent shadow-lg rounded-2xl p-8 border border-gray-200 "
            >
              {submitted && (
                <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded-md">
                  Message sent successfully! We'll get back to you soon.
                </div>
              )}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full border border-white-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-[#6b8c9a]"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full border border-white-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-[#6b8c9a]"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                <input
                  type="text"
                  name="phone"
                  placeholder="Your Phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full border border-white-300 rounded-md p-3 mb-6 focus:outline-none focus:ring-2 focus:ring-[#6b8c9a]"
                />
                <input
                  type="text"
                  name="subject"
                  placeholder="Subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full border border-white-300 rounded-md p-3 mb-6 focus:outline-none focus:ring-2 focus:ring-[#6b8c9a]"
                />

              </div>

              <textarea
                name="message"
                placeholder="Your Message"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                required
                className="w-full border border-white-300 rounded-md p-3 mb-6 focus:outline-none focus:ring-2 focus:ring-[#6b8c9a]"
              ></textarea>
              <button
                type="submit"
                disabled={loading}
                className="bg-[#6b8c9a] text-white px-10 py-3 rounded-full font-semibold tracking-wide hover:bg-[#5b7d86] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 w-full font-['Cormorant_Garamond']
 text-3xl"
              >
                {loading ? 'Sending...' : 'Send Message'}
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