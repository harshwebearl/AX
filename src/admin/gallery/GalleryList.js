import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BASEURL } from "../../BASEURL";
import Preloader from "../../Components/Preloader";

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

  const galleryVideos = [
    {
      id: 1,
      title: "Luxury Villa Walkthrough",
      youtubeId: "m8la0UGly3Q",
    },
    {
      id: 2,
      title: "Modern Interior Design",
      youtubeId: "XbsGeheuuV0",
    },
    {
      id: 3,
      title: "Luxury Villa Walkthrough",
      youtubeId: "m8la0UGly3Q",
    },
    {
      id: 4,
      title: "Modern Interior Design",
      youtubeId: "XbsGeheuuV0",
    },
    {
      id: 5,
      title: "Luxury Villa Walkthrough",
      youtubeId: "m8la0UGly3Q",
    },
    {
      id: 6,
      title: "Modern Interior Design",
      youtubeId: "XbsGeheuuV0",
    },
  ];

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
        {loading ? (
          <div className="col-span-full flex justify-center py-8">
            <Preloader />
          </div>
        ) : galleryCategories.length === 0 ? (
          <div className="col-span-full text-center text-gray-600 py-8">No categories found.</div>
        ) : (
          galleryCategories.map((cat) => (
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
          ))
        )}
      </div>
      <section className="mt-20">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <h1 className="text-3xl font-['Vollkorn'] font-bold text-[#2C4953]">
            Gallery Videos
          </h1>
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryVideos.map((video) => (
            <div
              key={video.id}
              className="bg-white border border-[#2C4953]/30 rounded-xl shadow-md p-4"
            >
              <iframe
                src={`https://www.youtube.com/embed/${video.youtubeId}`}
                className="w-full aspect-video rounded-lg"
                allowFullScreen
                title={video.title}
              ></iframe>

              <h3 className="mt-3 font-['Vollkorn'] text-[#2C4953] font-semibold text-lg">
                {video.title}
              </h3>

              {/* Actions */}
              <div className="flex justify-between mt-4">
                <Link
                  to={`/admin/edit-video/${video.id}`}
                  className="text-[#2C4953] hover:text-[#6b8c9a] border border-[#2C4953] p-1 rounded-lg hover:bg-[#2C4953] hover:text-white transition duration"
                >
                  Edit Video Link
                </Link>

              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
