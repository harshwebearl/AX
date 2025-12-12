import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaHome, FaPaintBrush, FaBuilding, FaCubes, FaLayerGroup, FaDraftingCompass } from "react-icons/fa";
import { BASEURL } from "../../BASEURL";
import Preloader from "../../Components/Preloader";

export default function ServiceList() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [confirm, setConfirm] = useState({ show: false, id: null, title: "" });
  const [messageModal, setMessageModal] = useState({ show: false, msg: "", type: "info" });

  // Map icon name string from API to react-icons component
  const iconMap = {
    FaHome: <FaHome />,
    FaPaintBrush: <FaPaintBrush />,
    FaBuilding: <FaBuilding />,
    FaCubes: <FaCubes />,
    FaLayerGroup: <FaLayerGroup />,
    FaDraftingCompass: <FaDraftingCompass />,
  };

  useEffect(() => {
    const fetchServices = async () => {
      setLoading(true);
      setError("");
      try {
        const token = localStorage.getItem("admin-token");
        const headers = { "Content-Type": "application/json" };
        if (token) headers["Authorization"] = `Bearer ${token}`;

        const res = await fetch(`${BASEURL}/admin/service`, { headers });
        if (!res.ok) {
          const errData = await res.json().catch(() => ({}));
          throw new Error(errData.message || `Request failed (${res.status})`);
        }
        const data = await res.json();
        if (Array.isArray(data)) {
          setServices(data);
        } else if (data.services && Array.isArray(data.services)) {
          setServices(data.services);
        } else {
          setServices(Array.isArray(data) ? data : []);
        }
      } catch (err) {
        console.error("Failed to load services:", err);
        setError(err.message || "Failed to load services");
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const deleteServiceConfirmed = async (id) => {
    if (!id) return;

    setLoading(true);
    try {
      const token = localStorage.getItem("admin-token");
      const headers = { "Content-Type": "application/json" };
      if (token) headers["Authorization"] = `Bearer ${token}`;

      const res = await fetch(`${BASEURL}/admin/service/${id}`, {
        method: "DELETE",
        headers,
      });

      const data = await res.json().catch(() => ({}));
      if (res.ok) {
        setServices((prev) => prev.filter((item) => (item._id || item.id) !== id));
        setMessageModal({ show: true, msg: "Service deleted successfully.", type: "success" });
      } else {
        const msg = data.message || `Failed to delete (${res.status})`;
        setError(msg);
        setMessageModal({ show: true, msg, type: "error" });
      }
    } catch (err) {
      console.error("Delete service error:", err);
      setError("Failed to delete service");
      setMessageModal({ show: true, msg: "Failed to delete service", type: "error" });
    } finally {
      setLoading(false);
      setConfirm({ show: false, id: null, title: "" });
    }
  };

  return (
    <div className="p-6">

      <div className="flex md:flex-row flex-col gap-3   justify-between items-start md:items-center mb-6">
        <h1 className="text-4xl font-['Vollkorn'] font-bold text-[#2C4953]">
          Manage Services
        </h1>

        <Link
          to="/admin/add-service"
          className="bg-[#2C4953]/10 border border-[#2C4953] text-[#2C4953] 
          font-['Cormorant_Garamond'] text-2xl px-4 py-2 rounded-md hover:bg-[#2C4953] 
          hover:text-white transition flex items-center gap-2"
        >
          <i className="fa-solid fa-plus"></i> Add Service
        </Link>
      </div>

      {/* SERVICES GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

        {loading && (
          <div className="col-span-full flex justify-center">
            <Preloader />
          </div>
        )}

        {error && (
          <div className="text-center text-red-600 col-span-full">{error}</div>
        )}

        {!loading && !error && services.length === 0 && (
          <div className="text-center col-span-full">No services found.</div>
        )}

        {!loading && !error && services.map((srv) => {
          const id = srv._id || srv.id;
          const title = srv.serviceName || srv.title || "Untitled";
          const desc = srv.description || srv.desc || "";
          const iconName = srv.icon && (srv.icon.icon || srv.icon.name) ? (srv.icon.icon || srv.icon.name) : null;
          const iconElem = iconName && iconMap[iconName] ? iconMap[iconName] : <FaDraftingCompass />;

          return (
            <div
              key={id}
              className="bg-white border border-[#2C4953]/30 rounded-xl shadow p-6 
            hover:shadow-lg transition flex flex-col justify-between items-center"
            >
              {/* ICON + TITLE */}
              <div className="text-center">
                <div className="text-5xl text-[#2C4953] mb-4 ">{iconElem}</div>

                <h3 className="text-xl font-['Vollkorn'] font-semibold text-[#2C4953]">
                  {title}
                </h3>

                <p className="text-gray-600 mt-2 font-['Vollkorn'] text-sm leading-relaxed">
                  {desc}
                </p>
              </div>

              <div className="flex items-center justify-between mt-6">
                <Link
                  to={`/admin/edit-service/${id}`}
                  state={{ service: srv }}
                  className="text-[#2C4953]  py-1 px-3 rounded-lg 
                hover:bg-[#2C4953] hover:text-white transition"
                >
                  <i className="fa-solid fa-pen"></i>
                </Link>

                <button
                  onClick={() => setConfirm({ show: true, id, title })}
                  className="text-red-600  py-1 px-3 rounded-lg 
                hover:bg-red-600 hover:text-white transition"
                >
                  <i className="fa-solid fa-trash"></i>
                </button>
              </div>
            </div>
          );
        })}

        {/* Confirmation Modal */}
        {confirm.show && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/50" onClick={() => setConfirm({ show: false, id: null, title: "" })}></div>
            <div className="bg-white rounded-lg shadow-lg p-6 z-10 max-w-md w-full mx-4">
              <h3 className="text-xl font-semibold mb-3">Confirm delete</h3>
              <p className="text-gray-700 mb-4">Are you sure you want to delete "{confirm.title}"?</p>
              <div className="flex justify-end gap-3">
                <button
                  className="px-4 py-2 rounded bg-gray-200"
                  onClick={() => setConfirm({ show: false, id: null, title: "" })}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 rounded bg-red-600 text-white"
                  onClick={() => deleteServiceConfirmed(confirm.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Message Modal */}
        {messageModal.show && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/40" onClick={() => setMessageModal({ show: false, msg: "", type: "info" })}></div>
            <div className={`bg-white rounded-lg shadow-lg p-6 z-10 max-w-sm w-full mx-4 ${messageModal.type === 'error' ? '' : ''}`}>
              <p className={`text-center ${messageModal.type === 'error' ? 'text-red-600' : 'text-green-600'} mb-4`}>{messageModal.msg}</p>
              <div className="flex justify-center">
                <button className="px-4 py-2 rounded bg-[#2C4953] text-white" onClick={() => setMessageModal({ show: false, msg: "", type: "info" })}>OK</button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
