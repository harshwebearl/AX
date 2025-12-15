import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Breadchrumb from "../Components/Breadchrumb";
import Preloader from "../Components/Preloader";
import GalleryVideos from "../Components/GalleryVideos";

const Gallery = () => {
  // state
  const [images, setImages] = useState([]);
  const [filters, setFilters] = useState(["All"]);
  const [activeFilter, setActiveFilter] = useState("All");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Provided image base URL
  const IMAGE_BASE = "https://aaxiero.aaxierodesignstudio.com";

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setError(null);

    fetch('https://aaxiero.aaxierodesignstudio.com/aaxiero/admin/gallery')
      .then((res) => {
        const ct = res.headers.get('content-type') || '';
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        // If response is JSON, parse it. Otherwise capture the text for a clearer error message.
        if (ct.includes('application/json')) return res.json();
        return res.text().then((text) => {
          // Make the error informative and short
          const snippet = text && text.length > 300 ? text.slice(0, 300) + '...' : text;
          throw new Error(`Expected JSON but received non-JSON response: ${snippet}`);
        });
      })
      .then((data) => {
        if (!mounted) return;
        const items = Array.isArray(data) ? data : data.galleries || data.items || data.data || [];

        // Extract unique category names from galleries
        const uniqueCategories = Array.from(
          new Set(
            items
              .map((item) => item.categoryId?.name || item.category || item.cat || item.category_name || 'Uncategorized')
              .filter(Boolean)
          )
        );

        // Flatten images array per item into individual image objects
        const mapped = items.flatMap((item) => {
          const category = item.categoryId?.name || item.category || item.cat || item.category_name || 'Uncategorized';
          const imgs = Array.isArray(item.images) ? item.images : (item.images ? [item.images] : []);

          // If API items already have single-image fields (src etc.), include them too
          const single = [];
          const rawSingle = item.src || item.image || item.filename || item.path || item.url || item.img || '';
          if (rawSingle) single.push(rawSingle);

          const allPaths = [...imgs, ...single];

          return allPaths.map((rawPath) => {
            const raw = rawPath || '';
            const src = raw
              ? raw.toString().startsWith('http')
                ? raw.toString()
                : `${IMAGE_BASE}/${raw.toString().replace(/^\/+/, '')}`
              : '';
            return {
              src,
              category,
              // keep reference to parent item id if useful
              parentId: item._id || item.id,
            };
          });
        });

        setImages(mapped);

        // Set filters with extracted unique categories
        setFilters(["All", ...uniqueCategories]);
      })
      .catch((err) => {
        if (!mounted) return;
        setError(err.message || 'Failed to load images');
      })
      .finally(() => {
        if (!mounted) return;
        setLoading(false);
      });

    return () => { mounted = false; };
  }, []);

  const filteredImages =
    activeFilter === "All"
      ? images
      : images.filter((img) => (img.category || '').toString() === activeFilter);

  // Group images by category for the 'All' view
  const groupedImages = images.reduce((acc, img) => {
    const cat = (img.category || 'Uncategorized').toString();
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(img);
    return acc;
  }, {});

  return (<>
    <Breadchrumb />
     <section className="py-20 bg-[#f7f9f9]">

      {/* Page Title */}
      <h2 className="text-center text-5xl md:text-6xl font-[Vollkorn] text-[#2C4953] font-bold mb-12">
        Our <span className="text-[#6b8c9a]">Gallery</span>
      </h2>

      {/* Filters */}
      <div className="flex justify-center gap-4 md:gap-8 mb-12 flex-wrap px-4">
        {filters.map((filter, index) => (
          <button
            key={index}
            onClick={() => setActiveFilter(filter)}
            className={`
              text-lg md:text-xl font-[Vollkorn] px-5 py-2 rounded-full border 
              transition-all duration-300
              ${activeFilter === filter 
                ? "bg-[#2C4953] text-white border-[#2C4953] shadow-md"
                : "text-[#2C4953] border-gray-400 hover:bg-[#2C4953] hover:text-white"}
            `}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {loading && <Preloader />}
        {error && (
          <div className="text-center py-6 text-red-600">Error: {error}</div>
        )}
        {activeFilter === 'All' ? (
          // Render sections per category
          Object.keys(groupedImages).length === 0 ? (
            <div className="text-center py-6 text-gray-600"></div>
          ) : (
            Object.entries(groupedImages).map(([category, imgs]) => (
              <div key={category} className="mb-12">
                <h3 className="text-2xl md:text-3xl font-[Vollkorn] text-[#2C4953] font-semibold mb-6">{category}</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {imgs.map((img, index) => (
                    <motion.div
                      key={`${category}-${index}`}
                      className="overflow-hidden rounded-xl shadow-md group"
                      whileHover={{ scale: 1.02 }}
                    >
                      <img
                        src={img.src || '/images/project/placeholder.jpg'}
                        alt={category}
                        className="w-full h-64 object-cover group-hover:scale-110 transition-all duration-700"
                      />
                    </motion.div>
                  ))}
                </div>
              </div>
            ))
          )
        ) : (
          // Single-category view (filtered)
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFilter}
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredImages.length === 0 ? (
                <div className="col-span-full text-center py-6 text-gray-600">No images in this category.</div>
              ) : (
                filteredImages.map((img, index) => (
                  <motion.div
                    key={index}
                    className="overflow-hidden rounded-xl shadow-md group"
                    whileHover={{ scale: 1.02 }}
                  >
                    <img
                      src={img.src || '/images/project/placeholder.jpg'}
                      alt={activeFilter}
                      className="w-full h-64 object-cover group-hover:scale-110 transition-all duration-700"
                    />
                  </motion.div>
                ))
              )}
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </section>
    <GalleryVideos />
  </>
  )
}

export default Gallery