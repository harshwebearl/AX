import React from "react";
import { Link } from "react-router-dom";

export default function GalleryList() {

  // FIXED CATEGORIES (you can edit name/thumbnail later)
  const galleryCategories = [
    {
      id: "interior",
      name: "Interior",
      thumb: "/images/project/1.jpg",
    },
    {
      id: "architecture",
      name: "Architecture",
      thumb: "/images/project/8.jpg",
    },
    {
      id: "commercial",
      name: "Commercial",
      thumb: "/images/project/5.jpg",
    },
    {
      id: "turnkey",
      name: "Turnkey",
      thumb: "/images/project/12.jpg",
    },
  ];

  return (
    <div className="p-6">

      {/* PAGE TITLE */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-['Vollkorn'] font-bold text-[#2C4953]">
          Gallery
        </h1>
      </div>

      {/* CATEGORY GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {galleryCategories.map((cat) => (
          <div
            key={cat.id}
            className="bg-white border border-[#2C4953] rounded-xl shadow-md p-4 hover:shadow-lg transition"
          >
            {/* Category Image */}
            <img
              src={cat.thumb}
              alt={cat.name}
              className="w-full h-40 object-cover rounded-xl mb-4"
            />

            {/* Category Name */}
            <h3 className="text-[#2C4953] text-xl font-['Vollkorn'] font-semibold text-center mb-4">
              {cat.name}
            </h3>

            {/* Actions */}
            <div className="flex flex-col gap-3">

              {/* Manage Images Button */}
              <Link
                to={`/admin/gallery/${cat.id}`}
                className="w-full text-center px-4 py-2 border border-[#2C4953] rounded-lg 
                hover:bg-[#2C4953] hover:text-white text-[#2C4953] transition"
              >
                Manage Images
              </Link>

            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
