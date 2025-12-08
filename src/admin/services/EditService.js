import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
    FaHome,
    FaPaintBrush,
    FaBuilding,
    FaCubes,
    FaLayerGroup,
    FaDraftingCompass,
} from "react-icons/fa";

export default function EditService() {
    const { id } = useParams(); // service ID from URL
    const navigate = useNavigate();

    const iconOptions = {
        home: <FaHome />,
        paint: <FaPaintBrush />,
        building: <FaBuilding />,
        cubes: <FaCubes />,
        layout: <FaLayerGroup />,
        turnkey: <FaDraftingCompass />,
    };

    // Dummy existing data
    const [serviceData, setServiceData] = useState({
        title: "",
        desc: "",
        iconKey: "home",
    });

    useEffect(() => {
        // In real app → fetch from backend
        setServiceData({
            title: "Residential Architecture",
            desc: "Complete home architecture and space planning tailored for modern living.",
            iconKey: "home",
        });
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log("Updated Service:", serviceData);
        alert("Service Updated Successfully!");

        navigate("/admin/servicelist");
    };

    return (
        <div className="p-6">
            {/* HEADER */}
            <div className="flex justify-between mb-6 items-center">
                <h1 className="text-4xl font-['Vollkorn'] text-[#2C4953] font-bold">
                    Edit Service
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
                    value={serviceData.title}
                    onChange={(e) =>
                        setServiceData({ ...serviceData, title: e.target.value })
                    }
                />

                {/* DESCRIPTION */}
                <label className="block mb-2 font-['Cormorant_Garamond'] text-xl text-[#2C4953]">
                    Description
                </label>
                <textarea
                    className="w-full border px-4 py-2 rounded-lg mb-6 h-28"
                    value={serviceData.desc}
                    onChange={(e) =>
                        setServiceData({ ...serviceData, desc: e.target.value })
                    }
                ></textarea>

                {/* ICON SELECT */}
                <label className="block mb-2 font-['Cormorant_Garamond'] text-xl text-[#2C4953]">
                    Select Icon
                </label>
                <select
                    value={serviceData.iconKey}
                    onChange={(e) =>
                        setServiceData({ ...serviceData, iconKey: e.target.value })
                    }
                    className="w-full border px-4 py-2 rounded-lg mb-6"
                >
                    {Object.keys(iconOptions).map((key) => (
                        <option key={key} value={key}>
                            {key}
                        </option>
                    ))}
                </select>

                {/* BUTTON */}
                <button
                    type="submit"
                    className="bg-[#2C4953] text-white px-3 md:px-6 py-3 rounded-lg text-xl hover:bg-[#476772] transition"
                >
                    Update Service
                </button>

                <Link className="ml-2 bg-[#2C4953] text-white px-3 md:px-6 py-3 rounded-lg text-xl hover:bg-[#476772] transition" to="/admin/servicelist">Cancel</Link>
            </form>
        </div>
    );
}
