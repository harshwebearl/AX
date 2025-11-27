import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function GalleryList() {
  // Dummy gallery images
  const [images] = useState([
    {
      id: 1,
      src: "/images/project/1.jpg",
      name: "Anti Collision Device",
    },
    {
      id: 2,
      src: "/images/project/c rail festoon system.jpeg",
      name: "C Rail Festoon System",
    },
    {
      id: 3,
      src: "/images/project/dsl shrouded busbar.jpeg",
      name: "DSL Shrouded Busbar",
    },
    {
      id: 4,
      src: "/images/project/master controller.jpeg",
      name: "Master Controller",
    },
    {
      id: 5,
      src: "/images/project/thruster brake.jpeg",
      name: "Thruster Brake",
    },
    {
      id: 6,
      src: "/images/project/rotary gear limit switch.jpeg",
      name: "Rotary Gear Limit Switch",
    },
  ]);

  return (
    <div className="p-6">

      {/* PAGE TITLE */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-brand font-bold text-[#2C4953] font-[Vollkorn]">
          Gallery Images
        </h1>

        <Link
          to="/admin/add-gallery"
          className="bg-[#2c4953]/40 font-['Cormorant_Garamond'] font-black text-2xl text-[#2C4953] px-4 py-2 rounded-md hover:bg-brandOrange transition flex items-center gap-2"
        >
          <i className="fa-solid fa-plus mr-2"></i>
          Add Image
        </Link>
      </div>

      {/* IMAGE GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {images.map((img) => (
          <div
            key={img.id}
            className="bg-white border border-brandLight rounded-xl shadow hover:shadow-lg transition p-4"
          >
            <img
              src={img.src}
              alt={img.name}
              className="w-full h-40 object-cover rounded-xl mb-3"
            />

            <h3 className="text-[#2C4953] font-semibold text-center mb-3">
              {img.name}
            </h3>

            <div className="flex gap-5 justify-between flex-cols md:flex-rows">

              <Link
                to={`/admin/edit-gallery/${img.id}`} className="flex w-fit bg-transparent text-[#2C4953] border border-[#2C4953] hover:text-white pr-2 py-2 rounded-lg text-xl hover:bg-[#2C4953]/80 cursor-pointer transition duration">
                <i className="fa-solid fa-edit icon-admin"></i>
                Edit
              </Link>
              <button className="flex w-fit pr-2  bg-transparent text-[#2C4953] border border-[#2C4953] hover:text-white py-2 rounded-lg text-xl hover:bg-[#2C4953]/80 cursor-pointer transition duration">
                <i className="fa-solid fa-trash  icon-admin"></i>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
