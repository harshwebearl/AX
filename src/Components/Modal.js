import React, { useEffect, useRef } from "react";

export default function Modal({ open, message, type = "info", onClose }) {
  const closeBtnRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  useEffect(() => {
    if (open && closeBtnRef.current) closeBtnRef.current.focus();
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" aria-hidden={!open}>
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        role="dialog"
        aria-modal="true"
        className="relative bg-white rounded-lg shadow-lg max-w-sm w-full mx-4 p-6 z-10"
      >
        <div className="flex items-start gap-3">
          <div>
            {type === "success" && (
              <i className="fa-solid fa-circle-check text-green-600 text-2xl" aria-hidden="true"></i>
            )}
            {type === "error" && (
              <i className="fa-solid fa-circle-xmark text-red-600 text-2xl" aria-hidden="true"></i>
            )}
            {type === "info" && (
              <i className="fa-solid fa-info-circle text-blue-600 text-2xl" aria-hidden="true"></i>
            )}
          </div>

          <div className="flex-1">
            <div className="text-sm text-gray-800">{message}</div>
          </div>

          <button
            ref={closeBtnRef}
            className="text-gray-500 hover:text-gray-700 ml-3"
            onClick={onClose}
            aria-label="Close popup"
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>
      </div>
    </div>
  );
}
