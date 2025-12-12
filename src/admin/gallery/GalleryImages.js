import React, { useState, useRef, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { BASEURL } from "../../BASEURL";
import Modal from "../../Components/Modal";
import Preloader from "../../Components/Preloader";

export default function GalleryImages() {
  const { categoryId } = useParams();
  const [galleryId, setGalleryId] = useState(null);

  // Display category title based on URL
  const categoryTitles = {
    interior: "Interior",
    architecture: "Architecture",
    commercial: "Commercial",
    turnkey: "Turnkey",
  };

  const pageTitle = categoryTitles[categoryId] || "Gallery";

  // Refs & upload state
  const fileInputRef = useRef(null);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [images, setImages] = useState([]);
  const [loadingImages, setLoadingImages] = useState(true);

  // Build uploads base and helper to ensure images are full URLs
  const uploadsBase = (() => {
    try {
      return new URL(BASEURL).origin;
    } catch (e) {
      return "https://aaxiero.kevalontechnology.in/uploads/";
    }
  })();

  const toFullUrl = (img) => {
    if (!img) return img;
    if (/^https?:\/\//i.test(img) || img.startsWith("data:")) return img;
    if (img.startsWith("/uploads/")) return uploadsBase.replace(/\/$/, "") + img;
    return uploadsBase + encodeURIComponent(img);
  };

  // Modal state for centered popups (replaces browser alert)
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalType, setModalType] = useState("info");
  const modalTimerRef = useRef(null);

  const showModal = (message, type = "info", timeout = 3000) => {
    if (modalTimerRef.current) {
      clearTimeout(modalTimerRef.current);
      modalTimerRef.current = null;
    }
    setModalMessage(message);
    setModalType(type);
    setModalOpen(true);
    if (timeout > 0) {
      modalTimerRef.current = setTimeout(() => {
        setModalOpen(false);
        modalTimerRef.current = null;
      }, timeout);
    }
  };

  // Clear timer on unmount
  useEffect(() => {
    return () => {
      if (modalTimerRef.current) {
        clearTimeout(modalTimerRef.current);
      }
    };
  }, []);

  // Fetch gallery ID and images when component loads
  useEffect(() => {
    const fetchGalleryData = async () => {
      try {
        setLoadingImages(true);
        const response = await fetch(
          `${BASEURL}/admin/gallery/${categoryId}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch gallery data");
        }

        const galleryData = await response.json();
        if (galleryData.gallery) {
          setGalleryId(galleryData.gallery._id);

          // Build uploads base from BASEURL origin (fallback to known host)
          const uploadsBase = (() => {
            try {
              return new URL(BASEURL).origin + "";
            } catch (e) {
              return "https://aaxiero.kevalontechnology.in/uploads/";
            }
          })();

          const toFullUrl = (img) => {
            if (!img) return img;
            if (/^https?:\/\//i.test(img) || img.startsWith("data:")) return img;
            if (img.startsWith("/uploads/")) return uploadsBase.replace(/\/$/, "") + img;
            return uploadsBase + encodeURIComponent(img);
          };

          if (galleryData.gallery.images && galleryData.gallery.images.length > 0) {
            setImages(galleryData.gallery.images.map(toFullUrl));
          } else {
            setImages([]);
          }
        } else {
          setImages([]);
        }
      } catch (error) {
        console.error("Error fetching gallery:", error);
        setImages([]);
      } finally {
        setLoadingImages(false);
      }
    };

    if (categoryId) {
      fetchGalleryData();
    }
  }, [categoryId]);

  const handleFilesSelected = (e) => {
    const files = e.target.files;
    if (!files) return setSelectedFiles([]);
    setSelectedFiles(Array.from(files));
  };

  const uploadFiles = async (files) => {
    if (!files || files.length === 0) return;
    if (!galleryId) {
      alert("Gallery not loaded. Please try again.");
      return;
    }

    try {
      setIsUploading(true);

      const formData = new FormData();
      
      files.forEach((file) => {
        formData.append("images", file);
      });

      const response = await fetch(
        `${BASEURL}/admin/gallery/${galleryId}`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        const errorData = await response.text();
        console.error("Server error:", errorData);
        throw new Error(`Upload failed: ${response.status}`);
      }

      const result = await response.json();

      if (result.success && result.gallery && result.gallery.images) {
        setImages(result.gallery.images.map(toFullUrl));
      }

      setSelectedFiles([]);
      if (fileInputRef.current) fileInputRef.current.value = "";
      showModal("Images uploaded successfully!", "success");
    } catch (error) {
      console.error("Upload error:", error);
      showModal("Failed to upload images. Please try again.", "error");
    } finally {
      setIsUploading(false);
    }
  };

  const [deletingImage, setDeletingImage] = useState(null);

  const getImagePath = (img) => {
    if (!img) return img;
    try {
      const u = new URL(img);
      if (u.pathname && u.pathname.includes("/uploads/")) return u.pathname;
    } catch (e) {
    }
    const idx = img.indexOf("/uploads/");
    if (idx !== -1) return img.slice(idx);
    return img;
  };

  const deleteImage = async (img) => {
    const imagePath = getImagePath(img);
    if (!galleryId) {
      showModal("Gallery not loaded. Please try again.", "error");
      return;
    }

    try {
      setDeletingImage(img);
      const res = await fetch(`${BASEURL}/admin/gallery/${galleryId}/image`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageUrl: imagePath }),
      });

      if (!res.ok) {
        const errText = await res.text();
        console.error("Delete server error:", errText);
        throw new Error(`Delete failed: ${res.status}`);
      }

      const result = await res.json();
      if (result.success && result.gallery && result.gallery.images) {
        setImages(result.gallery.images.map(toFullUrl));
        showModal(result.message || "Image deleted", "success");
      } else {
        console.error("Unexpected delete response:", result);
        showModal(result.message || "Failed to delete image", "error");
      }
    } catch (error) {
      console.error("Delete error:", error);
      showModal("Failed to delete image. Please try again.", "error");
    } finally {
      setDeletingImage(null);
    }
  };

  return (
    <div className="p-6 pb-24">

      {/* Centered modal popup (replaces alert) */}
      <Modal
        open={modalOpen}
        message={modalMessage}
        type={modalType}
        onClose={() => setModalOpen(false)}
      />

      {/* HEADER */}
      <div className="flex justify-between mb-6 items-center">

        <h1 className="font-['Vollkorn'] font-bold text-4xl text-[#2C4953]">
          {pageTitle} Images
        </h1>

        <Link
          to="/admin/gallerylist"
          className="text-[#2C4953] text-3xl hover:text-[#476772] transition"
        >
          <i className="fa-solid fa-circle-chevron-left"></i>
        </Link>
      </div>

      {/* UPLOAD */}
      <div className="mb-6">
        <label className="block font-['Cormorant_Garamond'] text-xl mb-2 text-[#2C4953]">
          Upload New Image
        </label>

        <div className="mb-6 w-full">
    {images.length < 20 ? (
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
      <div className="text-sm text-gray-600">Maximum 20 images uploaded. Delete an image to add more.</div>
    )}
  </div>
      </div>

      {/* IMAGE GRID */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">

        {loadingImages ? (
          <div className="col-span-full flex justify-center py-8">
            <Preloader />
          </div>
        ) : images.length === 0 ? (
          <div className="col-span-full text-center text-gray-600 py-8">No images found.</div>
        ) : (
          images.map((img, i) => (
            <div
              key={i}
              className="relative border border-[#2C4953] rounded-xl shadow-md overflow-hidden bg-white"
            >
              <img
                src={img}
                alt="AAxiero Design Studio"
                className="w-full h-40 object-cover"
              />

              {/* ACTION BUTTONS */}
              <div className="absolute top-2 right-2 flex flex-col gap-2">

                {/* Delete */}
                <button
                  className="bg-red-600 text-white text-sm p-1 rounded"
                  onClick={() => deleteImage(img)}
                >
                  <i className="fa-solid fa-trash"></i>
                </button>

              </div>

            </div>
          ))
        )}

      </div>

    </div>
  );
}