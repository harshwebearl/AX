import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BASEURL } from "../../BASEURL";

export default function AddSubCategory() {
  const [mainCategory, setMainCategory] = useState("");
  const [title, setTitle] = useState("");
  const [cover, setCover] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notification, setNotification] = useState({ open: false, type: '', message: '' });

  const [mainCategories, setMainCategories] = useState([]);

  useEffect(() => {
    const controller = new AbortController();
    const load = async () => {
      try {
        const res = await fetch(`${BASEURL}/admin/Subcatagories`, { signal: controller.signal });
        if (!res.ok) throw new Error("Network response was not ok");
        const data = await res.json();
        if (data && data.subcategories) {
          setMainCategories(data.subcategories);
        }
      } catch (err) {
        if (err.name !== 'AbortError') console.error('Failed to load subcategories', err);
      }
    };
    load();
    return () => controller.abort();
  }, []);

  const navigate = useNavigate();

  const showNotification = (type, message, autoClose = 3000) => {
    setNotification({ open: true, type, message });
    if (autoClose) {
      setTimeout(() => setNotification({ open: false, type: '', message: '' }), autoClose);
    }
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
      const res = await fetch(`${BASEURL}/admin/project`, {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (res.ok) {
        showNotification('success', 'Project added successfully');
        setTimeout(() => navigate('/admin/projectlist'), 1000);
      } else {
        console.error('Add project failed', data);
        showNotification('error', data.message || 'Failed to add project');
      }
    } catch (err) {
      console.error('Error adding project', err);
      showNotification('error', 'Network error while adding project');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
       <div className="flex justify-between mb-6 items-center">

        {/* PAGE TITLE */}
        <h1 className="font-brand font-bold font-['Cormorant_Garamond']  text-4xl text-[#2C4953]">
          Add New Project
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
            <option key={cat._id} value={cat._id}>{cat.name}</option>
          ))}
        </select>

        {/* Title Input */}
        <label className="font-[Vollkorn] text-[#2C4953] text-xl">
          Project Title (Project Name)
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
          disabled={isSubmitting}
          className="w-full bg-[#2C4953] hover:bg-[#476772] text-white py-3 rounded-lg font-semibold transition disabled:opacity-60"
        >
          {isSubmitting ? 'Adding...' : 'Add Project'}
        </button>

      </form>
    </div>
  );
}
