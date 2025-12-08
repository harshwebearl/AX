import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = (e) => {
    e.preventDefault();

    // FRONTEND ONLY (No backend validation)
    // Backend developer will replace this with real API
    if (form.email && form.password) {
      localStorage.setItem("admin-auth", "true");
      navigate("/admin");
    }
  };

  return (
    <div className="py-10 flex items-center justify-center  px-4 mt-22 ">

      <div className="bg-white shadow-xl rounded-xl w-full max-w-md border border-brandLight ">


        <div className="relative bg-[url(/images/logo/contact-bg.jpg)] bg-cover bg-center rounded-xl p-8">


          {/* Overlay */}
          <div className="absolute inset-0 bg-[#d5dbdd]/90 rounded-xl"></div>

          {/* Logo */}
          <div className="relative z-10 flex items-center justify-center sm:gap-2 gap-1 cursor-pointer">
            <img src="/images/logo/aaxiero-logo.png" alt="AAxiero Design Studio" className="sm:h-14 h-12 " />
            <div className="flex flex-col items-center">
              <h1 className="sm:text-3xl text-2xl font-bold tracking-wide text-[#2C4953] mt-1">
                AAxiero
              </h1>
              <h3 className="text-sm sm:text-lg md:text-xl text-[#2C4953] -mt-1">Design Studio</h3>
            </div>
          </div>

          {/* Title */}
          <h2 className="relative z-10 text-3xl font-[Vollkorn] font-bold text-center text-[#2C4953] mt-6 my-3">
            Admin Login
          </h2>

          {/* FORM */}
          <form onSubmit={handleLogin} className="space-y-5 relative z-10">

            {/* EMAIL */}
            <div>
              <label className="text-brandGrey text-sm font-medium">Email</label>
              <div className="flex items-center border border-brandLight rounded-lg px-3 mt-1">
                <i className="fa-solid fa-envelope text-brandGrey icon-admin"></i>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter email"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full px-2 py-2 outline-none font-body"
                  required
                />
              </div>
            </div>

            {/* PASSWORD */}
            <div>
              <label className="text-brandGrey text-sm font-medium">Password</label>
              <div className="flex items-center border border-brandLight rounded-lg px-3 mt-1">
                <i className="fa-solid fa-lock text-brandGrey icon-admin" ></i>
                <input
                  type="password"
                  name="password"
                  placeholder="Enter password"
                  value={form.password}
                  onChange={handleChange}
                  className="w-full px-2 py-2 outline-none font-body"
                  required
                />
              </div>
            </div>

            {/* LOGIN BUTTON */}
            <button
              type="submit"
              className="w-full bg-[#2C4953] cursor-pointer hover:bg-transparent text-white py-2 rounded-lg font-medium transition border border-[#2C4953] hover:text-[#2C4953] mt-5"
            >
              Login
            </button>
          </form>
        </div>

      </div>

    </div>
  );
}
