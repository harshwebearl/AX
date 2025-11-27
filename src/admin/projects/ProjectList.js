import React from "react";
import { Link } from "react-router-dom";

export default function ProjectList() {
  
  // MAIN CATEGORIES + SUB CATEGORIES + IMAGES
  const projectData = [
    {
      name: "Architecture",
      subcategories: [
        {
          _id: "arch1",
          title: "Shivalik Heights – Ahmedabad",
          cover: "/images/project/12.jpg",
          images: [
            "/images/project/12.jpg",
            "/images/project/11.jpg",
            "/images/project/10.jpg",
          ]
        },
        {
          _id: "arch2",
          title: "Skyview Residency",
          cover: "/images/project/9.jpg",
          images: [
            "/images/project/9.jpg",
            "/images/project/8.jpg",
          ]
        }
      ]
    },

    {
      name: "House Interior",
      subcategories: [
        {
          _id: "house1",
          title: "Green Villa – Interior",
          cover: "/images/project/7.jpg",
          images: [
            "/images/project/7.jpg",
            "/images/project/6.jpg",
          ]
        }
      ]
    },

    {
      name: "Office Interior",
      subcategories: [
        {
          _id: "office1",
          title: "Corporate Cabin Office",
          cover: "/images/project/5.jpg",
          images: [
            "/images/project/5.jpg",
            "/images/project/4.jpg",
          ]
        }
      ]
    },

    {
      name: "Commercial Interior",
      subcategories: [
        {
          _id: "com1",
          title: "Retail Showroom",
          cover: "/images/project/3.jpg",
          images: [
            "/images/project/3.jpg",
            "/images/project/2.jpg",
            "/images/project/1.jpg",
          ]
        }
      ]
    },
  ];

  return (
    <div className="p-6">

      {/* PAGE TITLE */}
      <div className="flex flex-wrap gap-2 justify-between items-center mb-8">
        <h1 className="text-3xl font-[Vollkorn] text-[#2C4953] font-bold">
          Project Management
        </h1>

        <Link
          to="/admin/add-subcategory"
          className="bg-[#2C4953] text-white px-4 py-2 rounded-md font-semibold hover:bg-[#476772] transition"
        >
          + Add New Sub-Category
        </Link>
      </div>

      {/* MAIN CATEGORY SECTION */}
      {projectData.map((category, i) => (
        <div key={i} className="mb-12">

          {/* Category Title */}
          <h2 className="text-3xl font-[Vollkorn] text-[#253f47] mb-6 border-l-4 border-[#2C4953] pl-3">
            {category.name}
          </h2>

          {/* Sub Category Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

            {category.subcategories.map((sub) => (
              <div
                key={sub._id}
                className="bg-white border rounded-xl shadow-md hover:shadow-xl transition-all overflow-hidden"
              >
                {/* Cover Image */}
                <img
                  src={sub.cover}
                  alt={sub.title}
                  className="w-full h-48 object-cover"
                />

                {/* Sub Category Info */}
                <div className="p-4">
                  <h3 className="text-xl font-[Vollkorn] font-semibold text-[#2C4953]">
                    {sub.title}
                  </h3>

                  {/* Sub actions */}
                  <div className="flex justify-between mt-4 text-xl">
                    <Link
                      to={`/admin/edit-subcategory/${sub._id}`}
                      className="text-[#2C4953] hover:text-[#476772]"
                    >
                      <i className="fa-solid fa-pen"></i>
                    </Link>

                    <Link
                      to={`/admin/manage-images/${sub._id}`}
                      className="text-[#2C4953] hover:text-[#476772]"
                    >
                      <i className="fa-solid fa-images"></i>
                    </Link>

                    <button
                      onClick={() => alert("Delete subcategory logic coming")}
                      className="text-red-500 hover:text-red-700"
                    >
                      <i className="fa-solid fa-trash"></i>
                    </button>
                  </div>
                </div>

              </div>
            ))}

          </div>
        </div>
      ))}

    </div>
  );
}
