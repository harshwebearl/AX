import { NavLink } from "react-router-dom";

export default function AdminSidebar({ sidebarOpen, setSidebarOpen }) {
  const linkClass = ({ isActive }) =>
    `relative z-20 flex items-center px-3 py-2 rounded-md transition font-medium
     ${isActive ? "bg-[#2C4953]/20 text-[#2C4953]" : "text-[#2C4953] hover:bg-[#2C4953]/10 hover:text-brandOrange"}`;

  return (
    <>
      {/* OVERLAY (Mobile Only) */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/40 md:hidden z-0"
        ></div>
      )}

      {/* SIDEBAR */}
      <aside
        className={`
          bg-brandBlue md:w-64 w-full p-6 pt-4 
          fixed md:static top-[171px] left-0 h-100vh z-30
          transform transition-transform bg-[url(/images/logo/service-bg.jpg)] bg-cover bg-center border-b  border-gray-200 duration-700
          ${sidebarOpen ? "translate-y-[1px]" : "-translate-y-[500px] md:translate-y-0"} 
        `}
      >      
       {/* Overlay */}
      <div className="absolute inset-0 bg-[#d5dbdd]/90"></div>

      <h2 className="relative z-10 text-2xl font-[Vollkorn] text-[#2C4953] font-bold hidden md:block mt-3 mb-6">Admin Panel</h2>

        <nav className="relative z-10 space-y-2 font-bold font-['Cormorant_Garamond'] text-2xl text-[#2C4953]" onClick={() => setSidebarOpen(false)}>
          <NavLink to="/admin" end className={linkClass}>
            <i className="fa-solid fa-gauge mr-2"></i> Dashboard
          </NavLink>

          <NavLink to="/admin/ProjectList" className={linkClass}>
            <i className="fa-solid fa-box mr-2"></i> Projects
          </NavLink>

          <NavLink to="/admin/gallerylist" className={linkClass}>
            <i className="fa-solid fa-image mr-2"></i> Gallery
          </NavLink>

          <NavLink to="/login" className={linkClass}>
            <i className="fa-solid fa-right-from-bracket mr-2"></i> Logout
          </NavLink>
        </nav>
      </aside>
    </>
  );
}
