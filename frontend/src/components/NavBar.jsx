import React, { useState } from "react";
import { assets } from "../assets/assets";
import { NavLink, useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [token, setToken] = useState(true);

  const logout = () => {
    setToken(false);
    localStorage.removeItem("token");
  };

  return (
    <div className="flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-400">
      <img
        onClick={() => navigate("/")}
        className="w-44 cursor-pointer"
        src={assets.logo}
        alt=""
      />
      <ul className="hidden md:flex items-start gap-5 font-medium">
        <NavLink to="/">
          <li className="py-1">HOME</li>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
        </NavLink>
        <NavLink to="/doctors">
          <li className="py-1">ALL DOCTOR</li>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
        </NavLink>
        <NavLink to="/about">
          <li className="py-1">ABOUT</li>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
        </NavLink>
        <NavLink to="/contact">
          <li className="py-1">CONTACT</li>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
        </NavLink>
      </ul>
      <div className="flex items-center gap-4">
        {token ? (
          <div className="flex items-center gap-2 cursor-pointer group relative">
            <img className="w-8 rounded-full" src={assets.profile_pic} alt="" />
            <img className="w-2.5" src={assets.dropdown_icon} alt="" />
            <div className="absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block">
              <div className="min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4">
                <p
                  onClick={() => navigate("/my-profile")}
                  className="hover:text-black cursor-pointer"
                >
                  My Profile
                </p>
                <p
                  onClick={() => navigate("/my-appointments")}
                  className="hover:text-black cursor-pointer"
                >
                  My Appointments
                </p>
                <p onClick={logout} className="hover:text-black cursor-pointer">
                  Logout
                </p>
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="bg-primary text-white px-8 py-3 rounded-full font-light hidden md:block"
          >
            Create Account
          </button>
        )}
      </div>
      {/* Menu Icon */}
      <img
        onClick={() => setShowMenu(true)}
        className="w-7 md:hidden cursor-pointer hover:opacity-80 transition-opacity duration-200"
        src={assets.menu_icon2}
        alt="Menu"
      />

      {/* ---------- Mobile Menu ---------- */}
      <div
        className={`fixed inset-0 z-30 transition-all duration-300 ${
          showMenu ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
        } md:hidden`}
      >
        {/* Background Overlay */}
        {showMenu && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50"
            onClick={() => setShowMenu(false)}
          />
        )}

        {/* Menu Content */}
        <div className="absolute right-0 top-0 h-full w-64 bg-white shadow-lg transition-all duration-300">
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-6 border-b border-gray-200">
            <img className="w-36" src={assets.logo} alt="Logo" />
            <img
              className="w-7 cursor-pointer hover:opacity-80 transition-opacity duration-200"
              onClick={() => setShowMenu(false)}
              src={assets.cross_icon}
              alt="Close"
            />
          </div>

          {/* Navigation Links */}
          <ul className="flex flex-col items-center gap-4 mt-6 px-5 text-lg font-medium">
            {[
              { label: "HOME", path: "/" },
              { label: "ALL DOCTORS", path: "/doctors" },
              { label: "ABOUT", path: "/about" },
              { label: "CONTACT", path: "/contact" },
            ].map((item, index) => (
              <NavLink
                key={index}
                onClick={() => setShowMenu(false)}
                to={item.path}
                className="w-full text-center px-4 py-3 rounded-md transition-all duration-300 hover:bg-primary hover:text-white"
              >
                {item.label}
              </NavLink>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
