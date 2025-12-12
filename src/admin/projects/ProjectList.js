import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BASEURL } from "../../BASEURL";
import Preloader from "../../Components/Preloader";

export default function ProjectList() {
  const [projectData, setProjectData] = useState([]);
  const [filterName, setFilterName] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [notification, setNotification] = useState({ open: false, type: '', message: '' });
  const [confirmDelete, setConfirmDelete] = useState({ open: false, id: null, title: '' });

  // removed static fallback data — we want to show no data if fetch fails

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("admin-token");
        const headers = { "Content-Type": "application/json" };
        if (token) headers["Authorization"] = `Bearer ${token}`;

        const res = await fetch(`${BASEURL}/admin/project`, { headers });
        if (!res.ok) {
          throw new Error(`Failed to fetch projects (${res.status})`);
        }

        const data = await res.json();
        const projects = data.projects || data;

        if (!Array.isArray(projects)) {
          throw new Error("Invalid projects data format");
        }

        // Group projects by subCategoryId.name (fall back to categoryId)
        const groupedByCategory = {};
        projects.forEach((proj) => {
          const catName = (proj.subCategoryId && (proj.subCategoryId.name || proj.subCategoryId)) || proj.categoryId || "uncategorized";
          if (!groupedByCategory[catName]) {
            groupedByCategory[catName] = [];
          }
          groupedByCategory[catName].push({
            _id: proj._id,
            title: proj.projectName,
            cover: proj.coverImage,
            images: [proj.coverImage], // fallback; could fetch more images separately
          });
        });

        // Convert grouped data to expected format
        const formattedData = Object.entries(groupedByCategory).map(([name, items]) => ({
          name,
          subcategories: items,
        }));

        setProjectData(formattedData);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch projects:", err);
        setError(err.message);
        // On error, do not use static fallback — show empty list
        setProjectData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Use fetched data (no static fallback)
  const displayData = projectData;

  // Apply text filter on category (subCategory name)
  const categoriesToRender = displayData.filter((category) => {
    if (!filterName || filterName.trim() === "") return true;
    return category.name && category.name.toLowerCase().includes(filterName.toLowerCase());
  });

  // Helper to build full image URL when API returns a path like `/uploads/...`
  const IMAGE_HOST = "https://aaxiero.kevalontechnology.in";
  const imageUrl = (p) => {
    if (!p) return "";
    if (p.startsWith("http") || p.startsWith("data:")) return p;
    if (p.startsWith("/")) return `${IMAGE_HOST}${p}`;
    return `${IMAGE_HOST}/${p}`;
  };

  const showNotification = (type, message, autoClose = 3000) => {
    setNotification({ open: true, type, message });
    if (autoClose) setTimeout(() => setNotification({ open: false, type: '', message: '' }), autoClose);
  };

  const deleteProject = async (projectId) => {
    try {
      const token = localStorage.getItem('admin-token');
      const headers = {};
      if (token) headers['Authorization'] = `Bearer ${token}`;

      const res = await fetch(`${BASEURL}/admin/project/${projectId}`, {
        method: 'DELETE',
        headers,
      });
      const data = await res.json();
      if (res.ok) {
        // Remove the deleted project from local state
        const updated = projectData.map((cat) => ({
          ...cat,
          subcategories: cat.subcategories.filter((s) => s._id !== projectId),
        })).filter((cat) => cat.subcategories.length > 0);
        setProjectData(updated);
        showNotification('success', data.message || 'Project deleted successfully');
      } else {
        console.error('Delete failed', data);
        showNotification('error', data.message || 'Failed to delete project');
      }
    } catch (err) {
      console.error('Error deleting project', err);
      showNotification('error', 'Network error while deleting project');
    } finally {
      setConfirmDelete({ open: false, id: null, title: '' });
    }
  };
  

  return (
    <div className="p-6">

      {/* PAGE TITLE */}
      <div className="flex flex-wrap gap-2 justify-between items-center mb-8">
        <h1 className="text-3xl font-[Vollkorn] text-[#2C4953] font-bold">
          Project Management
        </h1>

        <Link
          to="/admin/add-subcategory"
          className="bg-[#2C4953] text-white px-4 py-2 rounded-md font-semibold hover:bg-[#476772] transition"
        >
          + Add New Project
        </Link>
      </div>

      {loading && (
        <div className="my-6">
          <Preloader />
        </div>
      )}
      {error && <p className="text-center text-red-500">Error: {error}</p>}

      {/* FILTER INPUT */}
      {/* <div className="mb-6">
        <input
          value={filterName}
          onChange={(e) => setFilterName(e.target.value)}
          placeholder="Filter by sub-category name (e.g. Office Interior)"
          className="border p-2 rounded w-full md:w-1/3"
        />
      </div> */}

      {/* MAIN CATEGORY SECTION */}
      {categoriesToRender.map((category, i) => (
        <div key={i} className="mb-12">

          {/* Category Title */}
          <h2 className="text-3xl font-[Vollkorn] text-[#253f47] mb-6 border-l-4 border-[#2C4953] pl-3">
            {category.name}
          </h2>

          {/* Sub Category Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

            {category.subcategories.map((sub) => (
              <div
                key={sub._id}
                className="bg-white border rounded-xl shadow-md hover:shadow-xl transition-all overflow-hidden"
              >
                {/* Cover Image */}
                <img
                  src={imageUrl(sub.cover)}
                  alt={sub.title}
                  className="w-full h-48 object-cover"
                />

                {/* Sub Category Info */}
                <div className="p-4">
                  <h3 className="text-xl font-[Vollkorn] font-semibold text-[#2C4953]">
                    {sub.title}
                  </h3>

                  {/* Sub actions */}
                  <div className="flex justify-between mt-4 text-xl">
                    <Link
                      to={`/admin/edit-subcategory/${sub._id}`}
                      className="text-[#2C4953] hover:text-[#476772]"
                    >
                      <i className="fa-solid fa-pen"></i>
                    </Link>

                    <Link
                      to={`/admin/manage-images/${sub._id}`}
                      className="text-[#2C4953] hover:text-[#476772]"
                    >
                      <i className="fa-solid fa-images"></i>
                    </Link>

                    <button
                      onClick={() => setConfirmDelete({ open: true, id: sub._id, title: sub.title })}
                      className="text-red-500 hover:text-red-700"
                    >
                      <i className="fa-solid fa-trash"></i>
                    </button>
                  </div>
                </div>

              </div>
            ))}

          </div>
        </div>
      ))}

      {/* Confirm Delete Modal */}
      {confirmDelete.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40" onClick={() => setConfirmDelete({ open: false, id: null, title: '' })}></div>
          <div className="bg-white rounded-lg shadow-lg p-6 z-50 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold mb-2">Confirm Delete</h3>
            <p>Are you sure you want to delete "{confirmDelete.title}"? This action cannot be undone.</p>
            <div className="mt-4 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setConfirmDelete({ open: false, id: null, title: '' })}
                className="px-4 py-2 bg-gray-200 rounded-md"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => deleteProject(confirmDelete.id)}
                className="px-4 py-2 bg-red-600 text-white rounded-md"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Centered Notification Modal */}
      {notification.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40" onClick={() => setNotification({ open: false, type: '', message: '' })}></div>
          <div className="bg-white rounded-lg shadow-lg p-6 z-50 max-w-md w-full mx-4">
            <div className="flex items-start">
              <div className={`text-2xl mr-3 ${notification.type === 'success' ? 'text-green-600' : 'text-red-600'}`}>
                {notification.type === 'success' ? '✔' : '✖'}
              </div>
              <div>
                <div className={`font-semibold ${notification.type === 'success' ? 'text-green-700' : 'text-red-700'}`}>
                  {notification.type === 'success' ? 'Success' : 'Error'}
                </div>
                <div className="mt-1 text-sm text-gray-700">{notification.message}</div>
              </div>
            </div>
            <div className="mt-4 text-right">
              <button
                type="button"
                onClick={() => setNotification({ open: false, type: '', message: '' })}
                className="px-4 py-2 bg-[#2C4953] text-white rounded-md"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
