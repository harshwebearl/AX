import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";
import Breadchrumb from "../Components/Breadchrumb";

const Gallery = () => {
  // state
  const [images, setImages] = useState([]);
  const [filters, setFilters] = useState(["All"]);
  const [activeFilter, setActiveFilter] = useState("All");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Provided image base URL
  const IMAGE_BASE = "https://aax.kevalontechnology.in";

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setError(null);

    fetch('https://aax.kevalontechnology.in/aaxiero/admin/gallery')
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

  return (
    <>
      <Helmet>
        <title>Image Gallery - AAxiero Design Studio</title>
        <meta name="description" content="Browse our gallery showcasing interior design work, architectural visualizations, and completed projects." />
        <meta name="keywords" content="AAxiero Design Studio, AAxiero Design Studio Ahmedabad, AAxiero Design Studio Nikol, Design studio in Ahmedabad, Design studio in Nikol, Interior designer in Nikol, Interior designer in Ahmedabad, Best interior designer near me, Architect in Nikol Ahmedabad, Architect near me, Top interior designer in Ahmedabad, Design studio near Nikol, Home interior designer Nikol Ahmedabad, Commercial interior designer Ahmedabad, Interior Design, Residential interior designer Ahmedabad, 2BHK interior designer Ahmedabad, 3BHK interior designer Ahmedabad, Luxury interior designer Ahmedabad, Budget interior designer Ahmedabad, Modular kitchen designer Ahmedabad, Living room interior designer Ahmedabad, Office interior designer Ahmedabad, Shop interior designer Ahmedabad, Showroom interior designer Ahmedabad, Restaurant interior designer Ahmedabad, Architectural design services Ahmedabad, Residential architecture Ahmedabad, Commercial architecture Ahmedabad, House plan designer Ahmedabad, Turnkey interior solutions Ahmedabad, Turnkey project contractor Ahmedabad, Turnkey services in Nikol, Best interior designer in Ahmedabad, Affordable interior designer Ahmedabad, Interior designer with 3D design Ahmedabad, Interior contractor in Ahmedabad, Modern home interior designer Ahmedabad, AAxiero Design Studio near Parikh Hospital, AAxiero Design Studio Nikol interior, AAxiero design and architecture studio Ahmedabad, #InteriorDesignerAhmedabad, #InteriorDesignerNikol, #ArchitectAhmedabad, #DesignStudioAhmedabad, #TurnkeySolutions, #HomeInteriorDesign, #CommercialInterior" />
        <link rel="canonical" href="https://aax.kevalontechnology.in/gallery" />
        
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Image Gallery - AAxiero Design Studio" />
        <meta property="og:description" content="Explore our collection of interior design and architectural work" />
        <meta property="og:url" content="https://aax.kevalontechnology.in/gallery" />
        
        {/* Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ImageGallery",
            "name": "AAxiero Design Studio Gallery",
            "description": "Gallery of interior design and architectural projects"
          })}
        </script>
      </Helmet>

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
        {loading && (
          <div className="text-center py-6 text-gray-600">Loading images…</div>
        )}
        {error && (
          <div className="text-center py-6 text-red-600">Error: {error}</div>
        )}
        {activeFilter === 'All' ? (
          // Render sections per category
          Object.keys(groupedImages).length === 0 ? (
            <div className="text-center py-6 text-gray-600">No images available.</div>
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
  </>
  )
}

export default Gallery