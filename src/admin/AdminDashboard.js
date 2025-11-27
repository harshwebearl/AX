import { Link } from "react-router-dom";

export default function AdminDashboard() {
  return (<>
     {/* PAGE CONTENT */}
      <div className="p-6">

        {/* PAGE TITLE */}
        <h1 className=" font-bold text-[#2C4953] font-[Vollkorn] text-3xl mb-8">
          Admin Dashboard
        </h1>

        {/* ======= TOP CARDS ======= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

          {/* TOTAL projects */}
          <Link to="/admin/ProjectList">
            <div className="group bg-white shadow-md rounded-xl p-6 border border-[#2C4953] flex items-center gap-5 hover:shadow-xl transition cursor-pointer">
              <div className="bg-brandBlue text-white p-4 rounded-lg group-hover:scale-110 transition">
                <i className="fa-solid fa-box text-2xl"></i>
              </div>
              <div>
                <p className="text-[#2C4953] font-[Vollkorn] text-2xl">Total Projects</p>
                <h2 className="text-3xl text-[#2C4953] font-bold text-center font-['Cormorant_Garamond']">7</h2>
              </div>
            </div>
          </Link>

          {/* GALLERY IMAGES */}
           <Link to="/admin/gallerylist">
          <div className="group bg-white shadow-md rounded-xl p-6 border border-[#2C4953] flex items-center gap-5 hover:shadow-xl transition cursor-pointer">
            <div className="bg-brandOrange text-white p-4 rounded-lg group-hover:scale-110 transition">
              <i className="fa-solid fa-image text-2xl"></i>
            </div>
            <div>
              <p className="text-[#2C4953] font-[Vollkorn] text-2xl">Gallery Images</p>
              <h2 className="text-3xl text-[#2C4953] font-bold text-center font-['Cormorant_Garamond']">120</h2>
            </div>
          </div>
</Link>

          {/* ADMIN USERS */}
          <div className="group bg-white shadow-md rounded-xl p-6 border border-[#2C4953] flex items-center gap-5 hover:shadow-xl transition cursor-pointer">
            <div className="bg-brandGrey text-white p-4 rounded-lg group-hover:scale-110 transition">
              <i className="fa-solid fa-user text-2xl"></i>
            </div>
            <div>
              <p className="text-[#2C4953] font-[Vollkorn] text-2xl">Admin Users</p>
              <h2 className="text-3xl text-[#2C4953] font-bold text-center font-['Cormorant_Garamond']">1</h2>
            </div>
          </div>

        </div>

        {/* ======= BOTTOM OVERVIEW BOX ======= */}
        <div className="bg-white rounded-xl shadow-md p-6 mt-10 border border-[#2C4953]">
          <h2 className="text-2xl font-semibold text-[#2C4953] font-[Vollkorn] mb-3">
            Quick Overview
          </h2>
          <p className="text-[#2C4953] leading-relaxed">
            Welcome to your admin panel. Use the sidebar to manage projects,
            gallery images, and update website content. This dashboard provides
            a quick snapshot of important activity and system information.
          </p>
        </div>

      </div> </>
  );
}
