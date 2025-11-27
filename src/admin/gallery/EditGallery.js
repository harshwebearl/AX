import React, { useState } from "react";
import AdminLayout from "../AdminLayout";
import { Link, useParams } from "react-router-dom";

export default function EditGallery() {
  const { id } = useParams();

  const [preview] = useState("/images/project/1.jpg");

  return (
      <div className="p-6">
        <div className="flex justify-between mb-6 items-center">

        <h1 className="font-brand font-bold font-['Cormorant_Garamond']  text-3xl text-[#2C4953] ">
          Edit Image
        </h1>
        <Link
          to="/admin/gallerylist"
          className=" font-['Cormorant_Garamond'] font-black text-2xl text-[#2C4953]  rounded-md hover:bg-brandOrange transition "
        >
          <i class="fa-solid fa-caret-left"></i>
        </Link>
        </div>

        <div className="bg-white p-6 rounded-xl shadow border border-[#2C4953] max-w-xl">

          <img src={preview} className="w-full h-52 rounded-md mb-4" />

          <label className="block mb-2 font-medium">Image Title</label>
          <input
            type="text"
            defaultValue="C-Rail Festoon System"
            className="w-full border border-[#2C4953] p-2 rounded mb-4"
          />

          <label className="block mb-2 font-medium">Change Image</label>
          <input
            type="file"
            className="w-full border border-[#2C4953] p-2 rounded mb-6"
          />

          <button className="bg-[#2C4953] hover:bg-transparent text-white hover:text-[#2C4953] px-6 py-3 rounded-lg font-medium transition border border-[#2C4953] cursor-pointer">
            Update Image
          </button>
        </div>
      </div>
  );
}
