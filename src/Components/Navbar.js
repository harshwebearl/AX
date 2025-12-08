import React, { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("home");

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";    // Disable scroll

    } else {
      document.body.style.overflow = "auto";      // Enable scroll
    }

    return () => {
      document.body.style.overflow = "auto";      // Cleanup when unmount
    };
  }, [menuOpen]);


  // Get current route from React Router
  const location = useLocation();

  // Update active menu when route changes
  useEffect(() => {
    const path = location.pathname.replace("/", "") || "home";
    setActive(path);
  }, [location]);

  const menuItemsLeft = [
    { name: "Home", id: "home", path: "/" },
    { name: "About", id: "about", path: "/about" },
    { name: "Gallery", id: "Gallery", path: "/Gallery" },
    { name: "Projects", id: "projects", path: "/projects" },
  ];
  const menuItemsRight = [
    { name: "Services", id: "services", path: "/services" },
    { name: "Contact", id: "contact", path: "/contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full bg-[#d5dbdd] backdrop-blur-md shadow-sm z-50 bg-[url(/images/logo/nav-bg.jpg)] bg-cover bg-center border-b border-gray-200">
      {/* Overlay */}
      <div className="absolute inset-0 bg-[#d5dbdd]/90"></div>

      <div className="relative z-10 max-w-7xl mx-auto flex justify-between items-center px-4 py-4 md:py-6 md:px-6 h-[89px]">
        {/* Left Menu */}
        <ul className="hidden lg:flex space-x-6 font-medium tracking-wide">
          {menuItemsLeft.map((item) => (
            <li key={item.id} className="relative group">
              <Link
                to={item.path}
                onClick={() => setActive(item.id)}
                className={`transition-all duration-300 text-2xl font-bold font-['Cormorant_Garamond']
 ${active === item.id
                    ? "text-[#2C4953]"
                    : "text-gray-500 hover:text-[#2C4953]"
                  }`}
              >
                {item.name}
              </Link>
              {active === item.id && (
                <span className="absolute left-0 right-0 bottom-0 h-[2px] bg-[#2C4953] origin-center scale-x-100 transition-all duration-300"></span>
              )}
            </li>
          ))}
        </ul>

        {/* Center Logo */}
        <div className="flex items-center absolute left-1/2 -translate-x-1/2 sm:gap-2 gap-1 cursor-pointer">
          <img src="/images/logo/aaxiero-logo.png" alt="AAxiero Design Studio" className="sm:h-14 h-12 " />
          <div className="flex flex-col items-center">
            <h1 className="sm:text-3xl text-2xl font-bold tracking-wide text-[#2C4953] mt-1">
              AAxiero
            </h1>
            <h3 className="text-sm sm:text-lg md:text-xl text-[#2C4953] -mt-1">Design Studio</h3>
          </div>
        </div>

        {/* Right Menu */}
        <ul className="hidden lg:flex space-x-6 text-[#2C4953] font-medium tracking-wide ml-auto items-center">
          {menuItemsRight.map((item) => (
            <li key={item.id} className="relative group">
              <Link
                to={item.path}
                onClick={() => setActive(item.id)}
                className={`transition-all duration-300 text-2xl font-bold font-['Cormorant_Garamond']
 ${active === item.id
                    ? "text-[#2C4953]"
                    : "text-gray-500 hover:text-[#2C4953]"
                  }`}
              >
                {item.name}
              </Link>
              {active === item.id && (
                <span className="absolute left-0 right-0 bottom-0 h-[2px] bg-[#2C4953] origin-center scale-x-100 transition-all duration-300"></span>
              )}
            </li>
          ))}


          {/* <li>
            <a
              href="https://maps.app.goo.gl/XqGaVmG2LRR9EnAF9"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#2C4953] hover:text-gray-600 transition-colors"
            >
              <i className="fa-solid fa-location-dot text-xl"></i>
            </a>
          </li> */}
        </ul>

        {/* Mobile Menu Button */}
         <a
              href="https://maps.app.goo.gl/XqGaVmG2LRR9EnAF9"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:block text-[#2C4953] hover:text-gray-600 transition-colors font-bold text-md sm:text-xl border-[#2C4953] rounded-md hover:bg-[#2C4953] hover:text-white text-center ml-2 sm:pb-2 pb-1 sm:px-2 px-[4px] p-1 border-2 "
            >
            Get <br className="sm:hidden block"  /> Quote </a>
         <a
              href="tel:+91 84604 31159"
              target="_blank"
              rel="noopener noreferrer"
              className=" lg:hidden text-[#2C4953] hover:text-gray-600 transition-colors font-bold text-md sm:text-xl border-[#2C4953] rounded-md hover:bg-[#2C4953] hover:text-white text-center ml-2 sm:pb-2 pb-1 sm:px-2 px-[4px] p-1 border-2 "
            >
            Get <br className="sm:hidden block"  /> Quote </a>
        <button
          className="lg:hidden text-[#2C4953] text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
       
        {/* <button
          className="lg:hidden text-[#2C4953] text-2xl"
        >
          {menuOpen ? <a href="tel:+91 84604 31159" > <i className="fa-solid fa-phone"></i></a> : <a href="tel:+91 84604 31159" > <i className="fa-solid fa-phone"></i></a>}
        </button> */}
      </div>




      {/* Mobile Menu */}
      {menuOpen && (<>
      
        <div className="lg:hidden shadow-lg border-t border-gray-200 pb-10 h-[650px] ">
          <ul className="relative z-10 flex flex-col items-center py-4 space-y-4 text-[#2C4953] font-medium">
            {[...menuItemsLeft, ...menuItemsRight].map((item) => (
              <li key={item.id}>
                <Link
                  to={item.path}
                  onClick={() => {
                    setActive(item.id);
                    setMenuOpen(false);
                  }}
                  className={`transition-all duration-300 text-2xl font-['Cormorant_Garamond']
 ${active === item.id
                      ? "text-[#253f47] font-black underline underline-offset-6"
                      : "hover:text-[#2C4953]"
                    }`}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>

          {/* Mobile Contact Info */}
          <div className="flex flex-col justify-center items-center gap-4 relative z-10 pb-4 font-['Cormorant_Garamond']
 pt-5 border-t border-gray-200">
            <a
              href="tel:+91 84604 31159"
              className="text-[#253f47] hover:text-gray font-bold transition-colors text-2xl"
            >
              <i className="fa-solid fa-phone"></i> +91 84604 31159
            </a>
            <a
              href="tel:+91 81416 72731"
              className="text-[#253f47] hover:text-gray font-bold transition-colors text-2xl"
            >
              <i className="fa-solid fa-phone"></i> +91 81416 72731
            </a>
            <a
              href="mailto:aaxierodesignstudio@gmail.com" target="_blank"
                rel=" noreferrer"
              className="text-[#253f47] hover:text-gray font-bold transition-colors text-2xl"
            >
              <i className="fa-solid fa-envelope"></i> aaxierodesignstudio@gmail.com
            </a>
            <a
              href="https://maps.app.goo.gl/XqGaVmG2LRR9EnAF9" target="_blank"
                rel=" noreferrer"
              className="text-[#253f47] hover:text-gray font-bold transition-colors text-2xl"
            >
              <i className="fa-solid fa-location-dot"></i> Nikol, Ahmedabad
            </a>

            <div className="flex gap-6">
              <a href="https://www.instagram.com/aaxiero_design_studio?igsh=bW1kMmxoMHV3MTB1" target="_blank"
                rel=" noreferrer" className="text-[#253f47] hover:text-gray font-bold transition-colors text-2xl">
                <i className="fa-brands fa-instagram"></i>
              </a>
              <a href="https://www.facebook.com/profile.php?id=100064026998275" target="_blank"
                rel=" noreferrer" className="text-[#253f47] hover:text-gray font-bold transition-colors text-2xl">
                <i className="fa-brands fa-facebook"></i>
              </a>
              <a href="https://wa.me/qr/F3GB4XA7NCW4C1" target="_blank"
                rel=" noreferrer" className="text-[#253f47] hover:text-gray font-bold transition-colors text-2xl">
                <i className="fa-brands fa-whatsapp"></i>
              </a>
              
            </div>
          </div>
        </div>
      </>

      )}
    </nav>
  );
}
