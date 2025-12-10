import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BASEURL } from "../../BASEURL";

export default function ProjectList() {
  const [projectData, setProjectData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Static fallback data for development/testing
  const staticProjectData = [
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

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("admin-token");
        const headers = { "Content-Type": "application/json" };
        if (token) headers["Authorization"] = `Bearer ${token}`;

        const res = await fetch(`${BASEURL}/admin/project`, { headers });
        if (!res.ok) {
          throw new Error(`Failed to fetch projects (${res.status})`);
        }

        const data = await res.json();
        const projects = data.projects || data;

        if (!Array.isArray(projects)) {
          throw new Error("Invalid projects data format");
        }

        // Group projects by categoryId
        const groupedByCategory = {};
        projects.forEach((proj) => {
          const catId = proj.categoryId || "uncategorized";
          if (!groupedByCategory[catId]) {
            groupedByCategory[catId] = [];
          }
          groupedByCategory[catId].push({
            _id: proj._id,
            title: proj.projectName,
            cover: proj.coverImage,
            images: [proj.coverImage], // fallback; could fetch more images separately
          });
        });

        // Convert grouped data to expected format
        const formattedData = Object.entries(groupedByCategory).map(([catId, items]) => ({
          name: catId, // TODO: fetch category name from API if needed
          categoryId: catId,
          subcategories: items,
        }));

        setProjectData(formattedData);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch projects:", err);
        setError(err.message);
        // Fallback to static data on error
        setProjectData(staticProjectData);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Use fetched data or static data as fallback
  const displayData = projectData.length > 0 ? projectData : staticProjectData;

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

      {loading && <p className="text-center text-gray-500">Loading projects...</p>}
      {error && <p className="text-center text-red-500">Error: {error}</p>}

      {/* MAIN CATEGORY SECTION */}
      {displayData.map((category, i) => (
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
