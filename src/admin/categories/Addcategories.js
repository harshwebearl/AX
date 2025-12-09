import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";


export default function Addcategories() {
  const navigate = useNavigate();


  const [title, setTitle] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const newService = {
      id: Date.now(), 
      title,
    };

    console.log("Category Added:", newService);
    alert("Category Added Successfully!");

    navigate("/admin/categories"); // redirect after save
  };

  return (
    <div className="p-6">
      {/* HEADER */}
      <div className="flex justify-between mb-6 items-center">
        <h1 className="text-4xl font-['Vollkorn'] text-[#2C4953] font-bold">
          Add New Category
        </h1>

        <Link
          to="/admin/categories"
          className="text-[#2C4953] text-3xl hover:text-[#6b8c9a]"
        >
          <i className="fa-solid fa-circle-arrow-left"></i>
        </Link>
      </div>

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="max-w-3xl bg-white p-6 rounded-xl border border-[#2C4953]/30 shadow"
      >
        {/* TITLE */}
        <label className="block mb-2 font-['Cormorant_Garamond'] text-xl text-[#2C4953]">
          Category Title
        </label>
        <input
          type="text"
          className="w-full border px-4 py-2 rounded-lg mb-6"
          placeholder="Enter category title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

       
        {/* SUBMIT BUTTON */}
        <button
          type="submit"
          className="bg-[#2C4953] text-white px-6 py-3 rounded-lg text-xl hover:bg-[#476772] transition"
        >
          Add Service
        </button>

        <Link className="ml-2 bg-[#2C4953] text-white px-3 md:px-6 py-3 rounded-lg text-xl hover:bg-[#476772] transition" to="/admin/servicelist">Cancel</Link>
      </form>
    </div>
  );
}
