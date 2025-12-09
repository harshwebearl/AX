import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams, useLocation } from "react-router-dom";
import { BASEURL } from "../../BASEURL";
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

    const iconMap = {
        turnkey: <FaDraftingCompass />,
        home: <FaHome />,
        paint: <FaPaintBrush />,
        building: <FaBuilding />,
        cubes: <FaCubes />,
        layout: <FaLayerGroup />,
    };

    // reverse lookup for icon component names (e.g. FaDraftingCompass -> turnkey)
    const iconNameToKey = {
        FaDraftingCompass: 'turnkey',
        FaHome: 'home',
        FaPaintBrush: 'paint',
        FaBuilding: 'building',
        FaCubes: 'cubes',
        FaLayerGroup: 'layout',
    };

    // service data for form
    const [serviceData, setServiceData] = useState({
        _id: id,
        title: "",
        desc: "",
        iconKey: "home",
        iconId: "",
    });

    const [iconList, setIconList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [modal, setModal] = useState({ open: false, title: "", message: "", onClose: null });

    const location = useLocation();

    useEffect(() => {
        // If navigation passed the service object, use it to prefill
        const passed = location.state && location.state.service;
        if (passed) {
            // prefer icon.name (friendly key) over icon.icon (component name)
            const iconName = passed.icon && (passed.icon.name || passed.icon.icon) ? (passed.icon.name || passed.icon.icon) : null;
            // map component name to our select key if needed
            const resolvedKey = iconNameToKey[iconName] || iconName || 'home';
            setServiceData({
                _id: passed._id || passed.id || id,
                title: passed.serviceName || passed.title || "",
                desc: passed.description || passed.desc || "",
                iconKey: resolvedKey,
                iconId: passed.icon && passed.icon._id ? passed.icon._id : (passed.iconId || ""),
            });
            return;
        }

        // otherwise fetch the service by id
        const fetchService = async () => {
            try {
                const token = localStorage.getItem("admin-token");
                const headers = { "Content-Type": "application/json" };
                if (token) headers["Authorization"] = `Bearer ${token}`;

                const res = await fetch(`${BASEURL}/admin/service/${id}`, { headers });
                if (!res.ok) return;
                const data = await res.json();
                const svc = data && data.service ? data.service : data;
                setServiceData({
                    _id: svc._id || svc.id || id,
                    title: svc.serviceName || svc.title || "",
                    desc: svc.description || svc.desc || "",
                    iconKey: (svc.icon && (svc.icon.icon || svc.icon.name)) || "home",
                    iconId: svc.icon && svc.icon._id ? svc.icon._id : (svc.iconId || ""),
                });
            } catch (err) {
                console.error("Failed to fetch service:", err);
            }
        };

        if (id) fetchService();
    }, [id, location.state]);

    // load available icons (attempt common endpoints) and map to keys/ids
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
                        if (data && Array.isArray(data.icons)) {
                            icons = data.icons;
                            break;
                        }
                    } catch (e) {
                        // try next
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
                    // if current serviceData.iconKey has no id, try to assign
                    if (serviceData.iconKey) {
                        const found = mapped.find((m) => m.key === serviceData.iconKey || m.label === serviceData.iconKey);
                        if (found && !serviceData.iconId) {
                            setServiceData((s) => ({ ...s, iconId: found.id }));
                        }
                    }
                } else {
                    const mapped = Object.keys(iconOptions).map((k) => ({ key: k, id: "", label: k, elem: iconOptions[k] }));
                    setIconList(mapped);
                }
            } catch (err) {
                console.error("Failed to load icons:", err);
                const mapped = Object.keys(iconOptions).map((k) => ({ key: k, id: "", label: k, elem: iconOptions[k] }));
                setIconList(mapped);
            }
        };

        loadIcons();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const doUpdate = async () => {
            const serviceName = serviceData.title && serviceData.title.trim();
            const description = serviceData.desc && serviceData.desc.trim();
            const iconId = serviceData.iconId || "";

            if (!serviceName || !description) {
                setModal({ open: true, title: "Missing fields", message: "Please fill in title and description.", onClose: null });
                return;
            }

            setLoading(true);
            try {
                const token = localStorage.getItem("admin-token");
                const headers = { "Content-Type": "application/json" };
                if (token) headers["Authorization"] = `Bearer ${token}`;

                const res = await fetch(`${BASEURL}/admin/service/${serviceData._id || id}`, {
                    method: "PUT",
                    headers,
                    body: JSON.stringify({ serviceName, description, iconId }),
                });

                const data = await res.json().catch(() => ({}));
                if (res.ok) {
                    setModal({
                        open: true,
                        title: "Success",
                        message: "Service updated successfully!",
                        onClose: () => navigate("/admin/servicelist"),
                    });
                } else {
                    const msg = data.message || `Failed to update service (${res.status})`;
                    setModal({ open: true, title: "Update Failed", message: msg, onClose: null });
                }
            } catch (err) {
                console.error("Failed to update service:", err);
                setModal({ open: true, title: "Error", message: "An error occurred while updating the service.", onClose: null });
            } finally {
                setLoading(false);
            }
        };

        doUpdate();
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
                <div className="flex items-center gap-3 mb-4">
                    <select
                        value={serviceData.iconKey}
                        onChange={(e) => {
                            const newKey = e.target.value;
                            const found = iconList.find((i) => i.key === newKey || i.label === newKey);
                            setServiceData({ ...serviceData, iconKey: newKey, iconId: found ? found.id : "" });
                        }}
                        className="flex-1 w-full border px-4 py-2 rounded-lg"
                    >
                        {iconList && iconList.length
                            ? iconList.map((it) => (
                                  <option key={it.key} value={it.key}>
                                      {it.label}
                                  </option>
                              ))
                            : Object.keys(iconOptions).map((key) => (
                                  <option key={key} value={key}>
                                      {key}
                                  </option>
                              ))}
                    </select>
                    <div className="text-3xl text-[#2C4953]">
                        {(iconList.find((i) => i.key === serviceData.iconKey) || {}).elem || iconOptions[serviceData.iconKey]}
                    </div>
                </div>

                {/* BUTTON */}
                <button
                    type="submit"
                    className="bg-[#2C4953] text-white px-3 md:px-6 py-3 rounded-lg text-xl hover:bg-[#476772] transition"
                >
                    Update Service
                </button>

                <Link className="ml-2 bg-[#2C4953] text-white px-3 md:px-6 py-3 rounded-lg text-xl hover:bg-[#476772] transition" to="/admin/servicelist">Cancel</Link>
            </form>

            {/* Centered modal for messages (replaces browser alert) */}
            {modal.open && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div className="absolute inset-0 bg-black/50" onClick={() => { setModal((m) => ({ ...m, open: false })); if (modal.onClose) modal.onClose(); }}></div>
                    <div className="bg-white rounded-lg shadow-lg z-10 max-w-lg w-full mx-4 p-6">
                        {modal.title && <h3 className="text-xl font-semibold mb-2">{modal.title}</h3>}
                        <div className="mb-4 text-[#2C4953]">{modal.message}</div>
                        <div className="flex justify-end">
                            <button
                                className="bg-[#2C4953] text-white px-4 py-2 rounded-lg hover:bg-[#476772] transition"
                                onClick={() => {
                                    setModal((m) => ({ ...m, open: false }));
                                    if (modal.onClose) modal.onClose();
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
