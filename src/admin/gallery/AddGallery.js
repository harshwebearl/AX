import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function AddGallery() {
  const [preview, setPreview] = useState(null);

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) setPreview(URL.createObjectURL(file));
  };

  return (
    <div className="p-6">
      <div className="flex justify-between mb-6 items-center">

        <h1 className="font-brand font-bold font-['Cormorant_Garamond']  text-3xl text-[#2C4953] ">
          Add Gallery Image
        </h1>
        <Link
          to="/admin/gallerylist"
          className=" font-['Cormorant_Garamond'] font-black text-2xl text-[#2C4953]  rounded-md hover:bg-brandOrange transition "
        >
          <i class="fa-solid fa-caret-left"></i>
        </Link>
      </div>

      <div className="bg-white p-6 rounded-xl shadow border border-[#2C4953] max-w-xl">

        {/* IMAGE PREVIEW */}
        {preview && (
          <img
            src={preview}
            className="w-full h-52 object-cover rounded-md mb-4"
            alt="AAxiero Design Studio"
          />
        )}

        <label className="block mb-2 font-medium text-[#2C4953]">Image Title</label>
        <input
          type="text"
          className="w-full border border-[#2C4953] p-2 rounded mb-4"
          placeholder="Enter Image Title"
        />

        <label className="block mb-2 font-medium text-[#2C4953]">Upload Image</label>
        <input
          type="file"
          className="w-full border border-[#2C4953] p-2 rounded mb-6"
          onChange={handleImage}
        />

        <button className="bg-[#2C4953] hover:bg-transparent text-white hover:text-[#2C4953] px-6 py-3 rounded-lg font-medium transition border border-[#2C4953] cursor-pointer">
          Upload Image
        </button>
      </div>
    </div>
  );
}
