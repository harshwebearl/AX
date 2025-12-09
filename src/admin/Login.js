import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASEURL } from "../BASEURL";

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [snack, setSnack] = useState({ msg: "", show: false, type: "error" });

  const showSnack = (msg, type = "error", duration = 3000) => {
    setSnack({ msg, show: true, type });
    setTimeout(() => setSnack((s) => ({ ...s, show: false })), duration);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      showSnack("Please enter both email and password.");
      return;
    }

    try {
      const res = await fetch(`${BASEURL}/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.email, password: form.password }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        // Save auth state and token/admin info
        localStorage.setItem("admin-auth", "true");
        if (data.token) localStorage.setItem("admin-token", data.token);
        if (data.admin) localStorage.setItem("admin", JSON.stringify(data.admin));
        navigate("/admin");
      } else {
        const msg = data.message || "Login failed. Check credentials.";
        showSnack(msg);
      }
    } catch (err) {
      console.error("Login error:", err);
      showSnack("An error occurred while logging in. Please try again.");
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
          {/* Snackbar */}
          <div
            aria-live="polite"
            className={`fixed bottom-6 left-1/2 z-50 transform -translate-x-1/2 transition-all duration-300 ${
              snack.show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6 pointer-events-none"
            }`}
          >
            <div
              className={`max-w-md w-full px-4 py-2 rounded shadow-lg text-sm font-medium flex items-end gap-3 ${
                snack.type === "error" ? "bg-red-600 text-white" : "bg-green-600 text-white"
              }`}
            >
              <span>{snack.msg}</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
