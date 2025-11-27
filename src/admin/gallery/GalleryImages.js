import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";

export default function GalleryImages() {
  const { categoryId } = useParams();

  // Display category title based on URL
  const categoryTitles = {
    interior: "Interior",
    architecture: "Architecture",
    commercial: "Commercial",
    turnkey: "Turnkey",
  };

  const pageTitle = categoryTitles[categoryId] || "Gallery";

  // Dummy initial images — replace with API data later
  const [images, setImages] = useState([
    "/images/project/1.jpg",
    "/images/project/2.jpg",
    "/images/project/3.jpg",
    "/images/project/4.jpg",
  ]);

  // Upload Image
  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    setImages((prev) => [...prev, url]);
  };

  // Delete Image
  const deleteImage = (img) => {
    setImages(images.filter((i) => i !== img));
  };

  return (
    <div className="p-6 pb-24">

      {/* HEADER */}
      <div className="flex justify-between mb-6 items-center">

        <h1 className="font-['Vollkorn'] font-bold text-4xl text-[#2C4953]">
          {pageTitle} Images
        </h1>

        <Link
          to="/admin/gallerylist"
          className="text-[#2C4953] text-3xl hover:text-[#476772] transition"
        >
          <i className="fa-solid fa-circle-chevron-left"></i>
        </Link>
      </div>

      {/* UPLOAD */}
      <div className="mb-6">
        <label className="block font-['Cormorant_Garamond'] text-xl mb-2 text-[#2C4953]">
          Upload New Image
        </label>

        <input
          type="file"
          onChange={handleUpload}
          className="border w-full px-4 py-3 rounded-lg text-sm"
        />
      </div>

      {/* IMAGE GRID */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">

        {images.map((img, i) => (
          <div
            key={i}
            className="relative border border-[#2C4953] rounded-xl shadow-md overflow-hidden bg-white"
          >
            <img
              src={img}
              alt="Gallery"
              className="w-full h-40 object-cover"
            />

            {/* ACTION BUTTONS */}
            <div className="absolute top-2 right-2 flex flex-col gap-2">

              {/* Replace Image */}
              <label className="bg-[#2C4953]/80 text-white text-sm p-1 rounded cursor-pointer">
                <i className="fa-solid fa-rotate"></i>
                <input
                  type="file"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (!file) return;
                    const newURL = URL.createObjectURL(file);

                    // Replace image
                    const updated = [...images];
                    updated[i] = newURL;
                    setImages(updated);
                  }}
                />
              </label>

              {/* Delete */}
              <button
                className="bg-red-600 text-white text-sm p-1 rounded"
                onClick={() => deleteImage(img)}
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
