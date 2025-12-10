import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Breadchrumb from "../Components/Breadchrumb";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { BASEURL } from "../BASEURL";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Projects = () => {
   


  // const categories = [
  //   {
  //     name: "Architecture",
  //     thumb: "/images/project/1.jpg",
  //     photos: [
  //       "/images/project/12.jpg",
  //       "/images/project/11.jpg",
  //       "/images/project/10.jpg",
  //       "/images/project/9.jpg",
  //     ],
  //   },
  //   {
  //     name: "House Interior",
  //     thumb: "/images/project/2.jpg",
  //     photos: [
  //       "/images/project/8.jpg",
  //       "/images/project/7.jpg",
  //       "/images/project/6.jpg",
  //     ],
  //   },
  //   {
  //     name: "Office Interior",
  //     thumb: "/images/project/3.jpg",
  //     photos: [
  //       "/images/project/5.jpg",
  //       "/images/project/4.jpg",
  //     ],
  //   },
  //   {
  //     name: "Commercial Interior",
  //     thumb: "/images/project/4.jpg",
  //     photos: [
  //       "/images/project/3.jpg",
  //       "/images/project/2.jpg",
  //       "/images/project/1.jpg",
  //     ],
  //   },
   
  // ];

  // categories will be loaded from the API
  const [categories, setCategories] = useState([]);
  const IMAGE_HOST = "https://aaxiero.kevalontechnology.in";
  const imageUrl = (p) => {
    if (!p) return "";
    if (p.startsWith("http") || p.startsWith("data:")) return p;
    if (p.startsWith("/")) return `${IMAGE_HOST}${p}`;
    return `${IMAGE_HOST}/${p}`;
  };

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`${BASEURL}/admin/Subcatagories`);
        if (!res.ok) return;
        const data = await res.json();
        if (data && data.subcategories) {
          const cats = data.subcategories.map((s) => ({ name: s.name, thumb: imageUrl(s.image || s.path || s.thumbnail), locations: [] }));
          if (cats.length) {
            setCategories(cats);
          }
        }
      } catch (err) {
        console.error('Failed to load categories', err);
      }
    };
    load();
  }, []);

  // Fetch projects and group by subcategory
  useEffect(() => {
    const loadProjects = async () => {
      try {
        const res = await fetch(`${BASEURL}/admin/project`);
        if (!res.ok) return;
        const data = await res.json();
        const projects = data.projects || data;
        if (!Array.isArray(projects)) return;
        
        const groupedBySubcat = {};
        projects.forEach((proj) => {
          const subcatName = (proj.subCategoryId && (proj.subCategoryId.name || proj.subCategoryId)) || proj.categoryId || "uncategorized";
          if (!groupedBySubcat[subcatName]) groupedBySubcat[subcatName] = [];
          groupedBySubcat[subcatName].push(proj);
        });
        
        setCategories((prevCats) =>
          prevCats.map((cat) => ({
            ...cat,
            locations: (groupedBySubcat[cat.name] || []).map((proj) => ({
              name: proj.projectName,
              photos: [proj.image1, proj.image2, proj.image3, proj.image4, proj.image5, proj.image6, proj.image7, proj.image8].filter(Boolean).map((p) => imageUrl(p)),
            })),
          }))
        );
      } catch (err) {
        console.error('Failed to load projects', err);
      }
    };
    loadProjects();
  }, []);

  // set first category as active once loaded
  const [activeCategoryName, setActiveCategoryName] = useState(null);
  useEffect(() => {
    if (!activeCategoryName && categories && categories.length > 0) {
      setActiveCategoryName(categories[0].name);
    }
  }, [categories, activeCategoryName]);

  // Get the active category object from the updated categories array
  const activeCategory = categories.find(cat => cat.name === activeCategoryName) || categories[0];



  // Prevent render errors while categories are loading
  if (!activeCategory || !categories || categories.length === 0) {
    return (
      <>
        <Breadchrumb />
        <section className="py-20 bg-[#f7f9f9]">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <p className="text-center text-gray-500">Loading projects...</p>
          </div>
        </section>
      </>
    );
  }

  return (<>

    <Breadchrumb />
    <section className="py-20 bg-[#f7f9f9]">

  {/* Page Title */}
  <h2 className="text-center text-5xl md:text-6xl font-[Vollkorn] text-[#2C4953] font-bold mb-12">
    Our <span className="text-[#6b8c9a]">Projects</span>
  </h2>

  {/* Top Category Carousel */}
  <div className="max-w-7xl mx-auto px-6 md:px-12">
    <Swiper
      modules={[Autoplay]}
      spaceBetween={20}
      slidesPerView={2}
      slidesOffsetBefore={10}
      autoplay={{ delay: 2000, disableOnInteraction: false }}
      breakpoints={{
        640: { slidesPerView: 3 },
        768: { slidesPerView: 4 },
        1024: { slidesPerView: 4 },
      }}
      className="pb-8"
    >
      {categories.map((cat, index) => (
        <SwiperSlide key={index}>
          <div
            onClick={() => setActiveCategoryName(cat.name)}
            className={`cursor-pointer shadow-md border transition-all duration-300 
              ${activeCategory && activeCategory.name === cat.name
                ? "border-[#2C4953] scale-105 rounded-none"
                : "border-gray-300 hover:scale-105 rounded-xl"}`}
          >
            <img
              src={cat.thumb}
              alt={cat.name}
              className={`w-full h-28 object-cover 
                ${activeCategory && activeCategory.name === cat.name ? "rounded-none" : "rounded-t-xl"}`}
            />
            <div className={`p-3 text-center 
              ${activeCategory && activeCategory.name === cat.name ? "bg-[#253f47] rounded-none" : "bg-white rounded-b-xl"}`}>
              <p className={`font-[Vollkorn] font-semibold 
                ${activeCategory && activeCategory.name === cat.name ? "text-white" : "text-gray-600"}`}>
                {cat.name}
              </p>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  </div>

  {/* Multi-Location Gallery */}
  <div className="max-w-7xl mx-auto px-6 md:px-12 mt-16">

    <AnimatePresence mode="wait">
      <motion.div
        key={activeCategory.name}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6 }}
      >
        {activeCategory.locations.map((loc, locIndex) => (
          <div key={locIndex} className="mb-20">

            {/* Location Title */}
            <h3 className="text-3xl md:text-4xl font-[Vollkorn] text-[#2C4953] font-semibold mb-6 border-l-4 border-[#6b8c9a] pl-4">
              {loc.name}
            </h3>

            {/* Photo Grid */}
            <div className="w-full">
              <Swiper
                modules={[ Autoplay]}
                spaceBetween={20}
                slidesPerView={1}
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                breakpoints={{
                  640: { slidesPerView: 2 },
                  1024: { slidesPerView: 3 },
                }}
              >
                {loc.photos.map((img, index) => (
                  <SwiperSlide key={index}>
                    <motion.div
                      className="overflow-hidden rounded-xl shadow-md group w-full"
                      whileHover={{ scale: 1.02 }}
                    >
                      <img
                        src={img}
                        alt={`${loc.name}-${index}`}
                        className="w-full h-64 object-cover group-hover:scale-110 transition-all duration-700"
                      />
                    </motion.div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

          </div>
        ))}
      </motion.div>
    </AnimatePresence>

  </div>

</section>



  </>
  )
}

export default Projects