import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function ManageImages() {
  const { id } = useParams();

  const [images, setImages] = useState([
    "/images/project/12.jpg",
    "/images/project/11.jpg",
    "/images/project/10.jpg",
  ]);

  const handleUpload = (e) => {
    const file = URL.createObjectURL(e.target.files[0]);
    setImages([...images, file]);
  };

  const deleteImage = (img) => {
    setImages(images.filter((i) => i !== img));
  };

  return (
   <div className="px-4 py-6 w-full max-w-full overflow-hidden">

  {/* Header */}
  <div className="flex justify-between items-center mb-6">
    <h1 className="font-['Cormorant_Garamond'] font-bold text-3xl md:text-4xl text-[#2C4953]">
      Manage Images
    </h1>

    <Link
      to="/admin/projectlist"
      className="font-['Cormorant_Garamond'] font-black text-2xl text-[#2C4953]"
    >
      <i className="fa-solid fa-caret-left"></i>
    </Link>
  </div>

  {/* Upload Input */}
  <div className="mb-6 w-full">
    <input
      type="file"
      onChange={handleUpload}
      className="border px-3 py-3 rounded-lg w-full"
    />
  </div>

  {/* Image Grid */}
  <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">

    {images.map((img, i) => (
      <div
        key={i}
        className="relative border rounded-xl shadow-md overflow-hidden w-full"
      >
        <img
          src={img}
          alt="project"
          className="w-full h-32 sm:h-36 md:h-40 object-cover"
        />

        {/* Delete Button */}
        <button
          className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full"
          onClick={() => deleteImage(img)}
        >
          <i className="fa-solid fa-trash"></i>
        </button>
      </div>
    ))}

  </div>
</div>

  );
}
