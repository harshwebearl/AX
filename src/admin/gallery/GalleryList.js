import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BASEURL } from "../../BASEURL";

export default function GalleryList() {

  // categories now loaded from API (`/admin/categories`)
  const [galleryCategories, setGalleryCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const IMAGE_HOST = "https://aaxiero.kevalontechnology.in";
  const imageUrl = (p, fallback = "/images/project/1.jpg") => {
    if (!p) return fallback;
    if (p.startsWith("http") || p.startsWith("data:")) return p;
    if (p.startsWith("/")) return `${IMAGE_HOST}${p}`;
    return `${IMAGE_HOST}/${p}`;
  };

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      try {
        const res = await fetch(`${BASEURL}/admin/categories`);
        if (!res.ok) {
          setLoading(false);
          return;
        }
        const data = await res.json();
        const list = data.categories || data.subcategories || data || [];
        const cats = (Array.isArray(list) ? list : []).map((s) => ({
          id: s._id || s.id || s.name,
          name: s.name || s.title || s.categoryName || String(s._id || s.id || "Unnamed"),
          thumb: imageUrl(s.image || s.path || s.thumbnail || s.thumb),
        }));
        if (mounted) setGalleryCategories(cats);
      } catch (err) {
        console.error("Failed to load gallery categories", err);
      } finally {
        if (mounted) setLoading(false);
      }
    };
    load();
    return () => { mounted = false; };
  }, []);

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
