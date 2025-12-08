import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaPaintBrush,
  FaBuilding,
  FaCubes,
  FaLayerGroup,
  FaDraftingCompass,
} from "react-icons/fa";

export default function AddService() {
  const navigate = useNavigate();

  const iconOptions = {
    home: <FaHome />,
    paint: <FaPaintBrush />,
    building: <FaBuilding />,
    cubes: <FaCubes />,
    layout: <FaLayerGroup />,
    turnkey: <FaDraftingCompass />,
  };

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [iconKey, setIconKey] = useState("home");

  const handleSubmit = (e) => {
    e.preventDefault();
    const newService = {
      id: Date.now(),
      title,
      desc,
      icon: iconOptions[iconKey],
    };

    console.log("Service Added:", newService);
    alert("Service Added Successfully!");

    navigate("/admin/servicelist"); // redirect after save
  };

  return (
    <div className="p-6">
      {/* HEADER */}
      <div className="flex justify-between mb-6 items-center">
        <h1 className="text-4xl font-['Vollkorn'] text-[#2C4953] font-bold">
          Add New Service
        </h1>

        <Link
          to="/admin/servicelist"
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
          Service Title
        </label>
        <input
          type="text"
          className="w-full border px-4 py-2 rounded-lg mb-6"
          placeholder="Enter service title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        {/* DESCRIPTION */}
        <label className="block mb-2 font-['Cormorant_Garamond'] text-xl text-[#2C4953]">
          Description
        </label>
        <textarea
          className="w-full border px-4 py-2 rounded-lg mb-6 h-28"
          placeholder="Enter service description"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          required
        ></textarea>

        {/* ICON SELECT */}
        <label className="block mb-2 font-['Cormorant_Garamond'] text-xl text-[#2C4953]">
          Select Icon
        </label>
        <select
          value={iconKey}
          onChange={(e) => setIconKey(e.target.value)}
          className="w-full border px-4 py-2 rounded-lg mb-6"
        >
          <option value="home">Home</option>
          <option value="paint">Paint Brush</option>
          <option value="building">Building</option>
          <option value="cubes">3D Cubes</option>
          <option value="layout">2D Layout</option>
          <option value="turnkey">Turnkey Solutions</option>
        </select>

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
