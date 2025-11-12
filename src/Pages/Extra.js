import React, { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { Link } from "react-router-dom";

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [active, setActive] = useState("home");

    // Highlight active link while scrolling
    useEffect(() => {
        const handleScroll = () => {
            const sections = ["home", "about", "services", "projects", "contact"];
            const scrollY = window.scrollY + 200; // offset for better detection

            sections.forEach((id) => {
                const section = document.getElementById(id);
                if (section && scrollY >= section.offsetTop && scrollY < section.offsetTop + section.offsetHeight) {
                    setActive(id);
                }
            });
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const menuItemsLeft = [
        { name: "Home", id: "home" },
        { name: "About", id: "about" },
        { name: "Services", id: "services" },
    ];
    const menuItemsRight = [
        { name: "Projects", id: "projects" },
        { name: "Contact", id: "contact" },
    ];

    return (
        <nav className="relative  fixed top-0 left-0 w-full bg-[#d5dbdd] backdrop-blur-md shadow-sm z-50 bg-[url(/images/logo/nav-bg.jpg)] bg-cover bg-center border-b border-gray-200">
            <div className="absolute inset-0 bg-[#d5dbdd]/80"></div>
            <div className="relative z-10 max-w-7xl mx-auto flex justify-between items-center px-4 py-6 md:px-6">
                {/* Logo */}
                <ul className="hidden md:flex space-x-8 text-[#2C4953] font-medium tracking-wide">
                    {menuItemsLeft.map((item) => (
                        <li key={item.id} className="relative group">
                            <Link
                                to={`${item.id}`}
                                onClick={() => setActive(item.id)}
                                className={`transition-all duration-300 text-3xl font-bold font-['Tangerine'] ${active === item.id
                                    ? "text-[#2C4953] font-bold"
                                    : "text-gray-500 hover:text-[#2C4953]"
                                    }`}
                            >
                                {item.name}
                            </Link>
                            {active === item.id && (
                                <span className="absolute left-0 right-0 top-1/2 h-[1px] bg-[#2C4953] rotate-12 origin-center scale-x-100 transition-all duration-300"></span>
                            )}
                        </li>
                    ))}
                </ul>

                {/* Center Logo */}
                <div className="flex items-center absolute left-1/2 -translate-x-1/2 gap-2">
                    <img
                        src="/images/logo/aaxiero-logo.png"
                        alt="AAxiero Logo"
                        className="h-14"
                    />
                    <div className="flex flex-col items-center">

                        <h1 className="text-3xl  font-bold tracking-wide text-[#2C4953] mt-1">
                            AAxiero
                        </h1>
                        <h3 className="text-lg md:text-xl text-[#2C4953] -mt-1">Design Studio</h3>
                    </div>
                </div>

                {/* Right Menu */}
                <ul className="hidden md:flex space-x-8 text-[#2C4953] font-medium tracking-wide ml-auto items-center">
                    {menuItemsRight.map((item) => (
                        <li key={item.id} className="relative group">
                            <Link
                                to={`${item.id}`}
                                onClick={() => setActive(item.id)}
                                className={`transition-all duration-300 text-3xl font-bold font-['Tangerine'] ${active === item.id
                                    ? "text-[#2C4953] font-bold"
                                    : "text-gray-500 hover:text-[#2C4953]"
                                    }`}
                            >
                                {item.name}
                            </Link>
                            {active === item.id && (
                                <span className="absolute left-0 right-0 top-1/2 h-[1px] bg-[#2C4953] rotate-12 origin-center scale-x-100 transition-all duration-300"></span>
                            )}
                        </li>
                    ))}
                    <li>
                        <a
                            href="https://www.apnawebx.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#2C4953] hover:text-gray-600 transition-colors"
                        >
                            <i className="fa-solid fa-location-dot text-xl"></i>
                        </a>
                    </li>

                </ul>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden text-[#2C4953] text-2xl"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    {menuOpen ? <FaTimes /> : <FaBars />}
                </button>
            </div>

            {/* Mobile Menu */}
            {menuOpen && (
                <div className="md:hidden  shadow-lg border-t  border-gray-200">
                    <ul className="relative z-10 flex flex-col items-center py-4 space-y-4 text-[#2C4953] font-medium">
                        {[...menuItemsLeft, ...menuItemsRight].map((item) => (
                            <li key={item.id}>
                                <Link
                                    to={`${item.id}`}
                                    onClick={() => {
                                        setActive(item.id);
                                        setMenuOpen(false);
                                    }}
                                    className={`transition-all duration-300 text-3xl  font-['Tangerine'] ${active === item.id
                                        ? " text-[#253f47] font-black underline underline-offset-6"
                                        : "hover:text-[#2C4953] "
                                        }`}
                                >
                                    {item.name}
                                </Link>

                            </li>

                        ))}
                    </ul>

                    <div className="flex flex-col justify-center items-center gap-4 relative z-10 flex justify-center pb-4 font-['Tangerine'] pt-5  border-t  border-gray-200">
                        <a
                            href="tel:91 99984 88480"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#253f47] hover:text-gray font-bold transition-colors text-2xl"
                        >
                            <i className="fa-solid fa-phone"></i> +91 99984 88480
                        </a>
                        <a
                            href="mailto:support@apnawebx.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#253f47] hover:text-gray font-bold transition-colors text-2xl"
                        >
                            <i className="fa-solid fa-envelope"></i> support@apnawebx.com
                        </a>
                        <a
                            href="https://www.apnawebx.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#253f47] hover:text-gray font-bold transition-colors text-2xl"
                        >
                            <i className="fa-solid fa-location-dot"></i> Nikol, Ahmedabad
                        </a>

                        <div className="flex gap-6">
                            <a
                                href="#"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[#253f47] hover:text-gray font-bold transition-colors text-2xl"
                            >
                                <i className="fa-brands fa-instagram"></i>
                            </a>
                            <a
                                href="#"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[#253f47] hover:text-gray font-bold transition-colors text-2xl"
                            >
                                <i className="fa-brands fa-facebook"></i>
                            </a>
                            <a
                                href="#"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[#253f47] hover:text-gray font-bold transition-colors text-2xl"
                            >
                                <i className="fa-brands fa-whatsapp"></i>
                            </a>
                            <a
                                href="#"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[#253f47] hover:text-gray font-bold transition-colors text-2xl"
                            >
                                <i className="fa-brands fa-twitter"></i>
                            </a>
                        </div>
                    </div>

                </div>
            )}
        </nav>
    );
}
