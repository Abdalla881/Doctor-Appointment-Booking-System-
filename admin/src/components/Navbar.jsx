import React, { useContext, useState } from "react";
import { assets } from "../assets/assets_admin/assets";
import { AdminContext } from "../context/AdminContext";
import { DoctorContext } from "../context/DoctorContext";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { aToken, setAToken } = useContext(AdminContext);
  const { dToken, setDToken } = useContext(DoctorContext);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const logout = () => {
    if (aToken) {
      setAToken("");
      localStorage.removeItem("aToken");
    }
    if (dToken) {
      setDToken("");
      localStorage.removeItem("dToken");
    }
    navigate("/");
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const getUserType = () => {
    if (aToken) return "Admin";
    if (dToken) return "Doctor";
    return "Guest";
  };

  const getUserInitials = () => {
    // You would replace this with actual user data from your context
    if (aToken) return "A";
    if (dToken) return "D";
    return "G";
  };

  return (
    <div className="flex justify-between items-center px-4 sm:px-8 py-3 border-b border-gray-100 bg-white shadow-sm sticky top-0 z-10">
      <div className="flex items-center gap-3">
        <img
          className="w-32 sm:w-40 cursor-pointer transition-transform hover:scale-105"
          src={assets.admin_logo}
          alt="Healthcare Logo"
          onClick={() => navigate(aToken ? "/admin" : dToken ? "/doctor" : "/")}
        />
        <span className="hidden sm:inline-block border px-3 py-1 rounded-full border-primary text-primary text-xs font-medium bg-primary/10">
          {getUserType()} Panel
        </span>
      </div>

      <div className="flex items-center gap-4">
        {/* User Profile Dropdown */}
        <div className="relative">
          <button
            onClick={toggleDropdown}
            className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-primary text-white font-medium hover:bg-primary-dark transition-colors"
          >
            {getUserInitials()}
          </button>

          {showDropdown && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20 border border-gray-100">
              <div className="px-4 py-2 text-sm text-gray-700 border-b border-gray-100">
                Signed in as{" "}
                <span className="font-medium">{getUserType()}</span>
              </div>
              <button
                onClick={() => {
                  navigate(aToken ? "/admin/profile" : "/doctor/profile");
                  setShowDropdown(false);
                }}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
              >
                My Profile
              </button>
              <button
                onClick={() => {
                  navigate("/settings");
                  setShowDropdown(false);
                }}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
              >
                Settings
              </button>
              <button
                onClick={logout}
                className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50 border-t border-gray-100"
              >
                Logout
              </button>
            </div>
          )}
        </div>

        {/* Logout Button - Hidden on small screens when dropdown is available */}
        <button
          onClick={logout}
          className="hidden sm:flex items-center gap-1 bg-primary hover:bg-primary-dark text-white text-sm px-4 py-2 rounded-full transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
