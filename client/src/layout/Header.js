import React, { useState } from "react";
import { Link } from "react-router-dom";
import NotificationBell from "../components/NotificationBell";
import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline";

export default function Header({ user }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <header className="bg-white shadow-lg flex items-center justify-between px-6 py-4 h-20 border-b-2 border-gray-100">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">Welcome, {user?.name || "User"}</h2>
        <p className="text-sm text-gray-600">Role: {user?.role || "User"}</p>
      </div>
      <div className="flex items-center space-x-6">
        <NotificationBell />
        
        {/* User Profile Dropdown */}
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-100 transition duration-200"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
              {user?.name ? user.name[0].toUpperCase() : "U"}
            </div>
            <div className="text-left hidden sm:block">
              <p className="text-sm font-semibold text-gray-800">{user?.name || "User"}</p>
              <p className="text-xs text-gray-600">{user?.email}</p>
            </div>
          </button>

          {/* Dropdown Menu */}
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 z-50">
              <Link
                to="/profile"
                className="block px-4 py-3 text-gray-700 hover:bg-gray-100 transition rounded-t-lg font-medium"
              >
                👤 My Profile
              </Link>
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-3 text-red-600 hover:bg-red-50 transition rounded-b-lg font-medium flex items-center gap-2"
              >
                <ArrowRightOnRectangleIcon className="w-4 h-4" />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
