import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BASEURL } from "../../BASEURL";
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
    home: { id: "", elem: <FaHome /> },
    paint: { id: "", elem: <FaPaintBrush /> },
    building: { id: "", elem: <FaBuilding /> },
    cubes: { id: "", elem: <FaCubes /> },
    layout: { id: "", elem: <FaLayerGroup /> },
    // Provided turnkey iconId from your example
    turnkey: { id: "693787c3db616a50f3f0b7bc", elem: <FaDraftingCompass /> },
  };

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [iconKey, setIconKey] = useState("turnkey");
  const [loading, setLoading] = useState(false);
  const [iconList, setIconList] = useState([]);
  const [modal, setModal] = useState({ open: false, title: "", message: "", onClose: null, onConfirm: null, showCancel: false });

  // map icon name string to react-icon element
  const iconMap = {
    turnkey: <FaDraftingCompass />,
    home: <FaHome />,
    paint: <FaPaintBrush />,
    building: <FaBuilding />,
    cubes: <FaCubes />,
    layout: <FaLayerGroup />,
  };

  useEffect(() => {
    const loadIcons = async () => {
      try {
        const token = localStorage.getItem("admin-token");
        const headers = { "Content-Type": "application/json" };
        if (token) headers["Authorization"] = `Bearer ${token}`;

        // Primary icons endpoint (use this endpoint as source)
        const attempts = ["/admin/icons"];
        let icons = null;
        for (const p of attempts) {
          try {
            const res = await fetch(`${BASEURL}${p}`, { headers });
            if (!res.ok) continue;
            const data = await res.json().catch(() => null);
            if (Array.isArray(data)) {
              icons = data;
              break;
            }
            // Some APIs wrap data: { icons: [...] }
            if (data && Array.isArray(data.icons)) {
              icons = data.icons;
              break;
            }
          } catch (e) {
            // ignore and try next
          }
        }

        if (icons && icons.length) {
          const mapped = icons.map((it) => ({
            key: it.name || it.icon || it._id,
            id: it._id,
            label: it.name || it.icon || it._id,
            elem: iconMap[it.icon] || iconMap[it.name] || <FaDraftingCompass />,
          }));
          setIconList(mapped);
          // if current iconKey has no id and mapped contains it, set id
          if (!iconOptions[iconKey] || !iconOptions[iconKey].id) {
            const found = mapped.find((m) => m.key === iconKey || m.label === iconKey);
            if (found) setIconKey(found.key);
          }
        } else {
          // fallback: build from static iconOptions
          const mapped = Object.keys(iconOptions).map((k) => ({ key: k, id: iconOptions[k].id, label: k, elem: iconOptions[k].elem }));
          setIconList(mapped);
        }
      } catch (err) {
        console.error("Failed to load icons:", err);
        const mapped = Object.keys(iconOptions).map((k) => ({ key: k, id: iconOptions[k].id, label: k, elem: iconOptions[k].elem }));
        setIconList(mapped);
      }
    };

    loadIcons();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const serviceName = title.trim();
    const description = desc.trim();
    // find selected icon entry
    const selected = iconList.find((i) => i.key === iconKey) || { id: iconOptions[iconKey]?.id || "" };
    const iconId = selected.id || "";
    if (!serviceName || !description) {
      setModal({ open: true, title: "Missing fields", message: "Please fill title and description.", onClose: null, onConfirm: null, showCancel: false });
      return;
    }

    const submitRequest = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("admin-token");
        const headers = { "Content-Type": "application/json" };
        if (token) headers["Authorization"] = `Bearer ${token}`;

        const res = await fetch(`${BASEURL}/admin/service`, {
          method: "POST",
          headers,
          body: JSON.stringify({ serviceName, description, iconId }),
        });

        const data = await res.json().catch(() => ({}));
        if (res.ok) {
          setModal({ open: true, title: "Success", message: "Service added successfully.", onClose: () => navigate("/admin/servicelist"), onConfirm: null, showCancel: false });
        } else {
          const msg = data.message || `Failed to add service (${res.status})`;
          setModal({ open: true, title: "Add Failed", message: msg, onClose: null, onConfirm: null, showCancel: false });
        }
      } catch (err) {
        console.error("Add service error:", err);
        setModal({ open: true, title: "Error", message: "An error occurred while adding the service.", onClose: null, onConfirm: null, showCancel: false });
      } finally {
        setLoading(false);
      }
    };

    // If no iconId available, ask user if they want to proceed without one using modal confirm
    if (!iconId) {
      setModal({
        open: true,
        title: "No Icon Selected",
        message: "Selected icon does not have an iconId. Submit service without iconId?",
        onClose: null,
        onConfirm: submitRequest,
        showCancel: true,
      });
      return;
    }

    // otherwise submit immediately
    submitRequest();
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
          {iconList && iconList.length
            ? iconList.map((it) => (
                <option key={it.key} value={it.key}>
                  {it.label}
                </option>
              ))
            : Object.keys(iconOptions).map((k) => (
                <option key={k} value={k}>
                  {k}
                </option>
              ))}
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
      {/* Centered modal for messages/confirmations */}
      {modal.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => {
              setModal((m) => ({ ...m, open: false }));
              if (modal.onClose) modal.onClose();
            }}
          ></div>
          <div className="bg-white rounded-lg shadow-lg z-10 max-w-lg w-full mx-4 p-6">
            {modal.title && <h3 className="text-xl font-semibold mb-2">{modal.title}</h3>}
            <div className="mb-4 text-[#2C4953]">{modal.message}</div>
            <div className="flex justify-end gap-3">
              {modal.showCancel && (
                <button
                  className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400 transition"
                  onClick={() => setModal((m) => ({ ...m, open: false }))}
                >
                  Cancel
                </button>
              )}
              <button
                className="bg-[#2C4953] text-white px-4 py-2 rounded-lg hover:bg-[#476772] transition"
                onClick={() => {
                  setModal((m) => ({ ...m, open: false }));
                  if (modal.onConfirm) modal.onConfirm();
                  if (!modal.onConfirm && modal.onClose) modal.onClose();
                }}
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
