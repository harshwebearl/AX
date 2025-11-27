import React, { useEffect, useState } from "react";
import AdminSidebar from "./AdminSidebar";
import { Outlet } from "react-router-dom";

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

   // 🔥 Disable scroll when sidebar is open
  useEffect(() => {
    if (sidebarOpen) {
      document.body.style.overflow = "hidden"; // Stop scrolling
    } else {
      document.body.style.overflow = "auto";   // Enable scrolling
    }

    return () => {
      document.body.style.overflow = "auto";   // Cleanup
    };
  }, [sidebarOpen]);

  return (
    <div className="flex mt-28 md:mt-22 ">

      {/* SIDEBAR */}
      <AdminSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* MAIN CONTENT */}
      <div className="flex-1">

        {/* Mobile Top Bar */}
      <div className="md:hidden fixed top-[90px] left-0 w-full flex justify-between items-center p-4 shadow bg-[#2C4953] border-y-2  border-[#2C4953] bg-[url(/images/logo/service-bg.jpg)] bg-cover bg-center z-1000">

       {/* Overlay */}
      <div className="absolute inset-0 bg-[#d5dbdd]/70"></div>

          <h1 className="relative z-50 font-['Cormorant_Garamond'] text-[#2C4953] font-bold text-3xl ">Admin Panel</h1>

          {/* Mobile Toggle Button */}
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="relative z-50 p-[2px]">
            <i
              className={`fa-solid ${
                sidebarOpen ? "fa-xmark" : "fa-bars"
              } text-2xl`}
            ></i>
          </button>
        </div>
            <div className="mt-16 md:mt-2">

        <Outlet />
            </div>
      </div>
    </div>
  );
}
