import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import Breadchrumb from "../Components/Breadchrumb";
import { FaCubes, FaDraftingCompass, FaHome, FaBuilding, FaPaintBrush, FaLayerGroup } from "react-icons/fa";
import { BASEURL } from "../BASEURL";

export default function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  // Map icon names to React icon components
  const iconMap = {
    turnkey: <FaDraftingCompass />,
    home: <FaHome />,
    paint: <FaPaintBrush />,
    building: <FaBuilding />,
    cubes: <FaCubes />,
    layout: <FaLayerGroup />,
  };

  

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${BASEURL}/admin/service`);
        if (!res.ok) throw new Error(`Failed to fetch services (${res.status})`);

        const data = await res.json();
        const serviceList = data.services || data;

        if (Array.isArray(serviceList) && serviceList.length > 0) {
          // Map API response to component format
          const mapped = serviceList.map((svc) => ({
            title: svc.serviceName || svc.title || "",
            desc: svc.description || svc.desc || "",
            // Map icon name to React component; fallback to home icon
            icon: iconMap[svc.icon && svc.icon.name] || iconMap[svc.icon && svc.icon.icon] || <FaHome />,
          }));
          setServices(mapped);
        } else {
          setServices([]);
        }
      } catch (err) {
        console.error("Failed to fetch services:", err);
        setServices([]);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  return (<>
    <Helmet>
      <title>Our Services - AAxiero Design Studio</title>
      <meta name="description" content="Discover our comprehensive design services including interior design, architectural visualization, 3D rendering, and space planning." />
      <meta name="keywords" content="AAxiero Design Studio, AAxiero Design Studio Ahmedabad, AAxiero Design Studio Nikol, Design studio in Ahmedabad, Design studio in Nikol, Interior designer in Nikol, Interior designer in Ahmedabad, Best interior designer near me, Architect in Nikol Ahmedabad, Architect near me, Top interior designer in Ahmedabad, Design studio near Nikol, Home interior designer Nikol Ahmedabad, Commercial interior designer Ahmedabad, Interior Design, Residential interior designer Ahmedabad, 2BHK interior designer Ahmedabad, 3BHK interior designer Ahmedabad, Luxury interior designer Ahmedabad, Budget interior designer Ahmedabad, Modular kitchen designer Ahmedabad, Living room interior designer Ahmedabad, Office interior designer Ahmedabad, Shop interior designer Ahmedabad, Showroom interior designer Ahmedabad, Restaurant interior designer Ahmedabad, Architectural design services Ahmedabad, Residential architecture Ahmedabad, Commercial architecture Ahmedabad, House plan designer Ahmedabad, Turnkey interior solutions Ahmedabad, Turnkey project contractor Ahmedabad, Turnkey services in Nikol, Best interior designer in Ahmedabad, Affordable interior designer Ahmedabad, Interior designer with 3D design Ahmedabad, Interior contractor in Ahmedabad, Modern home interior designer Ahmedabad, AAxiero Design Studio near Parikh Hospital, AAxiero Design Studio Nikol interior, AAxiero design and architecture studio Ahmedabad, #InteriorDesignerAhmedabad, #InteriorDesignerNikol, #ArchitectAhmedabad, #DesignStudioAhmedabad, #TurnkeySolutions, #HomeInteriorDesign, #CommercialInterior" />
      <link rel="canonical" href="https://aax.kevalontechnology.in/services" />
      
      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content="Our Services - AAxiero Design Studio" />
      <meta property="og:description" content="Professional design services for residential and commercial spaces" />
      <meta property="og:url" content="https://aax.kevalontechnology.in/services" />
      
      {/* Schema */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "name": "AAxiero Design Studio",
          "description": "Professional interior design and architectural services",
          "url": "https://aax.kevalontechnology.in/services",
          "serviceType": ["Interior Design", "Architectural Services", "3D Visualization"]
        })}
      </script>
    </Helmet>

    <Breadchrumb page="Services" />

    <section className="py-20 bg-[#f7f9f9]">

      {/* Page Title */}
      <h1 className="text-center text-5xl md:text-6xl font-[Vollkorn] text-[#2C4953] font-bold mb-12">
        Our <span className="text-[#6b8c9a]">Services</span>
      </h1>

      {/* Subtitle */}
      <p className="text-center text-gray-600 max-w-3xl mx-auto mb-16 text-lg font-[Vollkorn] px-6">
        We provide end-to-end architectural and interior design services, delivering elegant 
        and functional solutions tailored to each client's vision.
      </p>

      {/* Services Grid */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {services.map((service, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}   
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="group bg-white rounded-2xl shadow-md border border-gray-200 p-8 text-center 
                       hover:-translate-y-2 hover:shadow-xl transition-all duration-500 flex flex-col justify-center items-center"
          >
            <div className="text-5xl text-[#2C4953] mb-6 group-hover:text-[#6b8c9a] transition-colors">
              {service.icon}
            </div>
            <h2 className="text-2xl font-[Vollkorn] text-[#2C4953] font-semibold mb-3">
              {service.title}
            </h2>
            <p className="text-gray-600 font-[Vollkorn] leading-relaxed">
              {service.desc}
            </p>
          </motion.div>
        ))}
      </div>

    </section>
    </>
  );
}
