import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useRef } from "react";
import { BASEURL } from "../../BASEURL";
import Preloader from "../../Components/Preloader";

export default function ManageImages() {
  const { id } = useParams();

  const IMAGE_HOST = "https://aaxiero.kevalontechnology.in";
  const imageUrl = (p) => {
    if (!p) return "";
    if (p.startsWith("http") || p.startsWith("data:")) return p;
    if (p.startsWith("/")) return `${IMAGE_HOST}${p}`;
    return `${IMAGE_HOST}/${p}`;
  };

  // store objects with both full URL and original path so we can send API deletes
  const [images, setImages] = useState([]);
  const [loadingImages, setLoadingImages] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [notification, setNotification] = useState({ open: false, type: '', message: '' });
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const controller = new AbortController();
    const load = async () => {
      try {
        if (!id) {
          setLoadingImages(false);
          return;
        }
        setLoadingImages(true);
        const token = localStorage.getItem('admin-token');
        const headers = {};
        if (token) headers['Authorization'] = `Bearer ${token}`;

        const res = await fetch(`${BASEURL}/admin/project/${id}`, { signal: controller.signal, headers });
        if (!res.ok) return; // don't crash on error
        const data = await res.json();
        const project = data.project || data;
        let imgs = [];
        // Prefer explicit image1..image8 fields if present
        const hasSlots = ['image1', 'image2', 'image3', 'image4', 'image5', 'image6', 'image7', 'image8'].some(k => project && Object.prototype.hasOwnProperty.call(project, k));
        if (hasSlots) {
          const slots = [];
          for (let i = 1; i <= 8; i++) {
            const key = `image${i}`;
            if (project[key]) slots.push({ path: project[key], slot: i, url: imageUrl(project[key]) });
          }
          imgs = slots;
        } else if (project && (project.images || project.projectImages || project.gallery)) {
          const arr = project.images || project.projectImages || project.gallery;
          imgs = arr.map((p, idx) => ({ path: p, url: imageUrl(p), slot: idx + 1 }));
        } else if (project && project.coverImage) {
          imgs = [{ path: project.coverImage, url: imageUrl(project.coverImage), slot: 1 }];
        }
        setImages(imgs);
        setLoadingImages(false);
      } catch (err) {
        if (err.name !== 'AbortError') console.error('Failed to load project images', err);
        setLoadingImages(false);
      }
    };
    load();
    return () => controller.abort();
  }, [id]);

  const showNotification = (type, message, autoClose = 3000) => {
    setNotification({ open: true, type, message });
    if (autoClose) setTimeout(() => setNotification({ open: false, type: '', message: '' }), autoClose);
  };

  const handleFilesSelected = (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return setSelectedFiles([]);
    if (images.length + files.length > 8) {
      showNotification('error', 'You can upload up to 8 images total');
      // reset input
      if (fileInputRef.current) fileInputRef.current.value = null;
      return;
    }
    setSelectedFiles(files);
    const previews = files.map((f) => URL.createObjectURL(f));
    setPreviewUrls(previews);
  };

  const uploadFiles = async (files) => {
    if (!files || files.length === 0) return;
    if (images.length + files.length > 8) return showNotification('error', 'You can upload up to 8 images total');

    // Determine occupied slots
    const occupied = new Set(images.map((i) => i.slot));
    const slotsToFill = [];
    for (let s = 1; s <= 8 && slotsToFill.length < files.length; s++) {
      if (!occupied.has(s)) slotsToFill.push(s);
    }
    if (slotsToFill.length < files.length) return showNotification('error', 'Not enough empty image slots (max 8)');

    const formData = new FormData();
    // assign files to image1..image8 keys according to available slots
    files.forEach((f, idx) => formData.append(`image${slotsToFill[idx]}`, f));

    setIsUploading(true);
    try {
      const token = localStorage.getItem('admin-token');
      const headers = {};
      if (token) headers['Authorization'] = `Bearer ${token}`;

      const res = await fetch(`${BASEURL}/admin/project/${id}`, {
        method: 'PUT',
        headers,
        body: formData,
      });

      let data = {};
      try { data = await res.json(); } catch (err) { /* ignore */ }

      if (res.ok) {
        let updated = [];
        const project = data.project || data;
        // if server returned image1..image8, map them to slots
        const hasSlotsResp = project && ['image1', 'image2', 'image3', 'image4', 'image5', 'image6', 'image7', 'image8'].some(k => Object.prototype.hasOwnProperty.call(project, k));
        if (project && hasSlotsResp) {
          for (let i = 1; i <= 8; i++) {
            const key = `image${i}`;
            if (project[key]) updated.push({ path: project[key], url: imageUrl(project[key]), slot: i });
          }
        } else if (project && (project.images || project.projectImages || project.gallery)) {
          const arr = project.images || project.projectImages || project.gallery;
          updated = arr.map((p, idx) => ({ path: p, url: imageUrl(p), slot: idx + 1 }));
        } else {
          const r2 = await fetch(`${BASEURL}/admin/project/${id}`, { headers });
          if (r2.ok) {
            const d2 = await r2.json();
            const p2 = d2.project || d2;
            if (p2) {
              const hasSlots2 = ['image1', 'image2', 'image3', 'image4', 'image5', 'image6', 'image7', 'image8'].some(k => Object.prototype.hasOwnProperty.call(p2, k));
              if (hasSlots2) {
                for (let i = 1; i <= 8; i++) {
                  const key = `image${i}`;
                  if (p2[key]) updated.push({ path: p2[key], url: imageUrl(p2[key]), slot: i });
                }
              } else {
                const arr2 = p2.images || p2.projectImages || p2.gallery || [];
                updated = arr2.map((p, idx) => ({ path: p, url: imageUrl(p), slot: idx + 1 }));
              }
            }
          }
        }
        setImages(updated);
        showNotification('success', data.message || 'Images uploaded');
        // cleanup previews
        previewUrls.forEach((u) => URL.revokeObjectURL(u));
        setPreviewUrls([]);
        setSelectedFiles([]);
        if (fileInputRef.current) fileInputRef.current.value = null;
      } else {
        console.error('Upload failed', data);
        showNotification('error', data.message || 'Failed to upload images');
      }
    } catch (err) {
      console.error('Error uploading images', err);
      showNotification('error', 'Network error while uploading images');
    } finally {
      setIsUploading(false);
    }
  };

  const deleteImage = async (imgObj) => {
    // attempt API delete with query param; fallback to local removal
    try {
      const token = localStorage.getItem('admin-token');
      const headers = {};
      if (token) headers['Authorization'] = `Bearer ${token}`;

      // Prefer deleting by slot if available, otherwise try deleting by image path
      let res;
      if (imgObj.slot) {
        res = await fetch(`${BASEURL}/admin/project/${id}/images?slot=${imgObj.slot}`, {
          method: 'DELETE',
          headers,
        });
      } else {
        const imgPath = imgObj.path.startsWith(IMAGE_HOST) ? imgObj.path.replace(IMAGE_HOST, '') : imgObj.path;
        res = await fetch(`${BASEURL}/admin/project/${id}/images?image=${encodeURIComponent(imgPath)}`, {
          method: 'DELETE',
          headers,
        });
      }
      if (res.ok) {
        setImages(images.filter((i) => i.path !== imgObj.path));
        showNotification('success', 'Image deleted');
      } else {
        // fallback: just remove locally
        setImages(images.filter((i) => i.path !== imgObj.path));
        showNotification('success', 'Image removed locally');
      }
    } catch (err) {
      console.error('Error deleting image', err);
      setImages(images.filter((i) => i.path !== imgObj.path));
      showNotification('success', 'Image removed locally');
    }
  };

  return (
    <div className="px-4 py-6 w-full max-w-full overflow-hidden">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="font-['Cormorant_Garamond'] font-bold text-3xl md:text-4xl text-[#2C4953]">
          Manage Images
        </h1>

        <Link
          to="/admin/projectlist"
          className="font-['Cormorant_Garamond'] font-black text-2xl text-[#2C4953]"
        >
          <i className="fa-solid fa-caret-left"></i>
        </Link>
      </div>

      {/* Upload Input */}
      <div className="mb-6 w-full">

        {images.length < 8 ? (
          <>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              onChange={handleFilesSelected}
              disabled={isUploading}
              className="border px-3 py-3 rounded-lg w-full"
              accept="image/*"
            />
            <div className="mt-3 flex items-center gap-2">
              <button
                onClick={() => uploadFiles(selectedFiles)}
                disabled={isUploading || !selectedFiles || selectedFiles.length === 0}
                className="px-4 py-2 bg-[#2C4953] text-white rounded-md disabled:opacity-60"
              >
                {isUploading ? 'Uploading...' : 'Add Images'}
              </button>
              {selectedFiles && selectedFiles.length > 0 && (
                <div className="text-sm text-gray-600">{selectedFiles.length} file(s) selected</div>
              )}
            </div>
          </>
        ) : (
          <div className="text-sm text-gray-600">Maximum 8 images uploaded. Delete an image to add more.</div>
        )}
      </div>

      {/* Image Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">

        {loadingImages ? (
          <div className="col-span-full flex justify-center py-8">
            <Preloader />
          </div>
        ) : (
          <>
            {previewUrls.map((u, idx) => (
              <div key={`preview-${idx}`} className="relative border rounded-xl shadow-md overflow-hidden w-full">
                <img src={u} alt={`preview-${idx}`} className="w-full h-32 sm:h-36 md:h-40 object-cover" />
                <div className="absolute bottom-2 left-2 bg-black/40 text-white text-xs px-2 py-1 rounded">Preview</div>
              </div>
            ))}

            {images.map((imgObj, i) => (
              <div
                key={i}
                className="relative border rounded-xl shadow-md overflow-hidden w-full"
              >
                <img
                  src={imgObj.url}
                  alt={`image-${i}`}
                  className="w-full h-32 sm:h-36 md:h-40 object-cover"
                />

                {/* Delete Button */}
                <button
                  className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full"
                  onClick={() => deleteImage(imgObj)}
                >
                  <i className="fa-solid fa-trash"></i>
                </button>
              </div>
            ))}
          </>
        )}

      </div>
    </div>

  );
}
