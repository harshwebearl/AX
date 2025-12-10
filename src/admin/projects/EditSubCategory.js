import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { BASEURL } from "../../BASEURL";

export default function EditSubCategory() {
  const { id } = useParams();

  const [mainCategory, setMainCategory] = useState("");
  const [title, setTitle] = useState("");
  const [cover, setCover] = useState(null);

  const [mainCategories, setMainCategories] = useState([]);
  const [currentCoverUrl, setCurrentCoverUrl] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notification, setNotification] = useState({ open: false, type: '', message: '' });
  const IMAGE_HOST = "https://aaxiero.kevalontechnology.in";
  const imageUrl = (p) => {
    if (!p) return "";
    if (p.startsWith("http") || p.startsWith("data:")) return p;
    if (p.startsWith("/")) return `${IMAGE_HOST}${p}`;
    return `${IMAGE_HOST}/${p}`;
  };

  useEffect(() => {
    const controller = new AbortController();

    const load = async () => {
      try {
        const token = localStorage.getItem('admin-token');
        const headers = {};
        if (token) headers['Authorization'] = `Bearer ${token}`;

        // Fetch available subcategories for the dropdown
        const subsRes = await fetch(`${BASEURL}/admin/Subcatagories`, { signal: controller.signal, headers });
        if (subsRes.ok) {
          const subsData = await subsRes.json();
          if (subsData && subsData.subcategories) setMainCategories(subsData.subcategories);
        }

        // Fetch project details by id
        if (id) {
          const projRes = await fetch(`${BASEURL}/admin/project/${id}`, { signal: controller.signal, headers });
          if (projRes.ok) {
            const proj = await projRes.json();
            // proj may be wrapped in { project: { ... } } or returned directly
            const project = proj.project || proj;
            if (project) {
              setTitle(project.projectName || project.title || "");
              // determine category id
              const catId = (project.subCategoryId && (project.subCategoryId._id || project.subCategoryId)) || project.categoryId || "";
              setMainCategory(catId);
              // coverImage may be a path; build full URL if needed
              if (project.coverImage) setCurrentCoverUrl(imageUrl(project.coverImage));
            }
          }
        }
      } catch (err) {
        if (err.name !== 'AbortError') console.error('Failed to load edit data', err);
      }
    };

    load();
    return () => controller.abort();
  }, [id]);

  const navigate = useNavigate();

  const showNotification = (type, message, autoClose = 3000) => {
    setNotification({ open: true, type, message });
    if (autoClose) setTimeout(() => setNotification({ open: false, type: '', message: '' }), autoClose);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!mainCategory) return showNotification('error', 'Please select a main category');
    if (!title.trim()) return showNotification('error', 'Please enter a project title');

    const formData = new FormData();
    if (cover) formData.append('coverImage', cover);
    formData.append('categoryId', mainCategory);
    formData.append('projectName', title);

    setIsSubmitting(true);
    try {
      const token = localStorage.getItem('admin-token');
      const headers = {};
      if (token) headers['Authorization'] = `Bearer ${token}`;

      const res = await fetch(`${BASEURL}/admin/project/${id}`, {
        method: 'PUT',
        headers,
        body: formData,
      });

      // attempt to parse JSON safely
      let data = {};
      try { data = await res.json(); } catch (err) { /* ignore */ }

      if (res.ok) {
        showNotification('success', data.message || 'Project updated successfully');
        setTimeout(() => navigate('/admin/projectlist'), 1000);
      } else {
        console.error('Update failed', data);
        showNotification('error', data.message || 'Failed to update project');
      }
    } catch (err) {
      console.error('Error updating project', err);
      showNotification('error', 'Network error while updating project');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
        <div className="flex justify-between mb-6 items-center">

        {/* PAGE TITLE */}
        <h1 className="font-brand font-bold font-['Cormorant_Garamond']  text-4xl text-[#2C4953]">
          Edit Sub Category
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
        <label className="font-[Vollkorn] text-[#2C4953] text-xl">
          Change Main Category
        </label>
        <select
          value={mainCategory}
          onChange={(e) => setMainCategory(e.target.value)}
          className="w-full border px-4 py-3 rounded-lg mt-2 mb-6"
        >
          <option value="">-- Select Category --</option>
          {mainCategories.map((cat) => (
            <option key={cat._id} value={cat._id}>{cat.name}</option>
          ))}
        </select>

        <label className="font-[Vollkorn] text-[#2C4953] text-xl">
          Project Title
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border px-4 py-3 rounded-lg mt-2 mb-6"
        />

        <label className="font-[Vollkorn] text-[#2C4953] text-xl">
          Change Cover Image
        </label>
        <input
          type="file"
          onChange={(e) => setCover(e.target.files[0])}
          className="w-full border px-4 py-3 rounded-lg mt-2 mb-6"
        />

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-[#2C4953] hover:bg-[#476772] text-white py-3 rounded-lg font-semibold transition disabled:opacity-60"
        >
          {isSubmitting ? 'Saving...' : 'Save Changes'}
        </button>

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
      </form>
    </div>
  );
}
