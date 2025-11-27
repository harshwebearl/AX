import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function AddSubCategory() {
  const [mainCategory, setMainCategory] = useState("");
  const [title, setTitle] = useState("");
  const [cover, setCover] = useState(null);

  const mainCategories = [
    "Architecture",
    "House Interior",
    "Office Interior",
    "Commercial Interior",
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Add Sub Category Logic Coming Soon!");
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
       <div className="flex justify-between mb-6 items-center">

        {/* PAGE TITLE */}
        <h1 className="font-brand font-bold font-['Cormorant_Garamond']  text-4xl text-[#2C4953]">
          Add New Sub Category
        </h1>
        <Link
          to="/admin/projectlist"
          className=" font-['Cormorant_Garamond'] font-black text-2xl text-[#2C4953]  rounded-md hover:bg-brandOrange transition "
        >
          <i class="fa-solid fa-caret-left"></i>
        </Link>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-xl p-6 border"
      >

        {/* Main Category Dropdown */}
        <label className="font-[Vollkorn] text-[#2C4953] text-xl">
          Select Main Category
        </label>
        <select
          value={mainCategory}
          onChange={(e) => setMainCategory(e.target.value)}
          className="w-full border px-4 py-3 rounded-lg mt-2 mb-6"
        >
          <option value="">-- Select Category --</option>
          {mainCategories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>

        {/* Title Input */}
        <label className="font-[Vollkorn] text-[#2C4953] text-xl">
          Sub-Category Title (Project Name)
        </label>
        <input
          type="text"
          placeholder="Eg: Shivalik Heights – Ahmedabad"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border px-4 py-3 rounded-lg mt-2 mb-6"
        />

        {/* Cover Image */}
        <label className="font-[Vollkorn] text-[#2C4953] text-xl">
          Upload Cover Image
        </label>
        <input
          type="file"
          onChange={(e) => setCover(e.target.files[0])}
          className="w-full border px-4 py-3 rounded-lg mt-2 mb-6 bg-white"
        />

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-[#2C4953] hover:bg-[#476772] text-white py-3 rounded-lg font-semibold transition"
        >
          Add Sub-Category
        </button>

      </form>
    </div>
  );
}
