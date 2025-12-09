import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function CategoriesList() {
  // Dummy data — replace with backend/API later
  const [services, setServices] = useState([
    {
      id: 1,
      title: "Commercial Architecture",
    },
    {
      id: 2,
      title: "Interior Designing",
    },
    {
      id: 3,
      title: "Architecture",
    },
    {
      id: 4,
      title: "Turnkey Solutions",
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
          Manage Categories
        </h1>

        <Link
          to="/admin/add-categories"
          className="bg-[#2C4953]/10 border border-[#2C4953] text-[#2C4953] 
          font-['Cormorant_Garamond'] text-2xl px-4 py-2 rounded-md hover:bg-[#2C4953] 
          hover:text-white transition flex items-center gap-2"
        >
          <i className="fa-solid fa-plus"></i> Add Categories
        </Link>
      </div>

      {/* CATEGORIES GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

        {services.map((srv) => (
          <div
            key={srv.id}
            className="bg-white border border-[#2C4953]/30 rounded-xl shadow p-6 
            hover:shadow-lg transition flex flex-col justify-between items-center"
          >
            {/* ICON + TITLE */}
            <div className="text-center">

              <h3 className="text-xl font-['Vollkorn'] font-semibold text-[#2C4953]">
                {srv.title}
              </h3>

             
            </div>

            {/* ACTION BUTTONS */}
            <div className="flex items-center justify-between mt-6">
              <Link
                to={`/admin/edit-categories/${srv.id}`}
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
