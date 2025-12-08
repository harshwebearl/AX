import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaHome, FaPaintBrush, FaBuilding, FaCubes, FaLayerGroup, FaDraftingCompass } from "react-icons/fa";

export default function ServiceList() {
  // Dummy data — replace with backend/API later
  const [services, setServices] = useState([
    {
      id: 1,
      icon: <FaHome />,
      title: "Residential Architecture",
      desc: "Complete home architecture and space planning tailored for modern living.",
    },
    {
      id: 2,
      icon: <FaPaintBrush />,
      title: "Interior Designing",
      desc: "Premium interiors with aesthetic and functional balance.",
    },
    {
      id: 3,
      icon: <FaBuilding />,
      title: "Commercial Architecture",
      desc: "Designing business spaces that elevate brand identity.",
    },
    {
      id: 4,
      icon: <FaCubes />,
      title: "3D Visualization",
      desc: "High-quality 3D renders bringing your ideas to life.",
    },
    {
      id: 5,
      icon: <FaLayerGroup />,
      title: "2D Layout Planning",
      desc: "Accurate architectural layout planning for efficient space use.",
    },
    {
      id: 6,
      icon: <FaDraftingCompass />,
      title: "Turnkey Solutions",
      desc: "Complete end-to-end execution with quality, precision, and reliability.",
    },
  ]);

  // DELETE SERVICE
  const deleteService = (id) => {
    setServices(services.filter((item) => item.id !== id));
  };

  return (
    <div className="p-6">

      {/* PAGE TITLE + BUTTON */}
      <div className="flex md:flex-row flex-col gap-3   justify-between items-start md:items-center mb-6">
        <h1 className="text-4xl font-['Vollkorn'] font-bold text-[#2C4953]">
          Manage Services
        </h1>

        <Link
          to="/admin/add-service"
          className="bg-[#2C4953]/10 border border-[#2C4953] text-[#2C4953] 
          font-['Cormorant_Garamond'] text-2xl px-4 py-2 rounded-md hover:bg-[#2C4953] 
          hover:text-white transition flex items-center gap-2"
        >
          <i className="fa-solid fa-plus"></i> Add Service
        </Link>
      </div>

      {/* SERVICES GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

        {services.map((srv) => (
          <div
            key={srv.id}
            className="bg-white border border-[#2C4953]/30 rounded-xl shadow p-6 
            hover:shadow-lg transition flex flex-col justify-between items-center"
          >
            {/* ICON + TITLE */}
            <div className="text-center">
              <div className="text-5xl text-[#2C4953] mb-4 ">{srv.icon}</div>

              <h3 className="text-xl font-['Vollkorn'] font-semibold text-[#2C4953]">
                {srv.title}
              </h3>

              <p className="text-gray-600 mt-2 font-['Vollkorn'] text-sm leading-relaxed">
                {srv.desc}
              </p>
            </div>

            {/* ACTION BUTTONS */}
            <div className="flex items-center justify-between mt-6">
              <Link
                to={`/admin/edit-service/${srv.id}`}
                className="text-[#2C4953]  py-1 px-3 rounded-lg 
                hover:bg-[#2C4953] hover:text-white transition"
              >
                <i className="fa-solid fa-pen"></i> 
              </Link>

              <button
                onClick={() => deleteService(srv.id)}
                className="text-red-600  py-1 px-3 rounded-lg 
                hover:bg-red-600 hover:text-white transition"
              >
                <i className="fa-solid fa-trash"></i> 
              </button>
            </div>
          </div>
        ))}

      </div>
    </div>
  );
}
