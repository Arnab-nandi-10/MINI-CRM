import React from "react";
import { Link, useLocation } from "react-router-dom";
import { HomeIcon, UsersIcon, SparklesIcon, ClipboardDocumentListIcon, Cog6ToothIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import { useUser } from "../context/UserContext";

export default function Sidebar() {
  const location = useLocation();
  const { user, loading } = useUser();

  // Example: permissions/roles could be more granular in future
  const isAdmin = user?.role === "Admin";
  const isSales = user?.role === "Sales Executive";
  const isSupport = user?.role === "Support Staff";

  // Menu items can be further customized based on user.permissions if available
  const navItems = [
    { name: "Dashboard", path: "/", icon: HomeIcon, show: true },
    { name: "Clients", path: "/clients", icon: UsersIcon, show: isAdmin || isSales },
    { name: "Leads", path: "/leads", icon: SparklesIcon, show: isAdmin || isSales },
    { name: "Tasks", path: "/tasks", icon: ClipboardDocumentListIcon, show: isAdmin || isSales || isSupport },
    { name: "Admin Panel", path: "/admin", icon: Cog6ToothIcon, show: isAdmin },
    { name: "Profile", path: "/profile", icon: UserCircleIcon, show: true },
  ];

  if (loading) {
    return (
      <aside className="bg-gradient-to-b from-gray-900 to-gray-800 text-white w-64 min-h-screen flex flex-col transition-all duration-300 md:relative fixed z-40">
        <div className="p-6 text-2xl font-bold tracking-wide border-b border-gray-700 bg-gradient-to-r from-blue-600 to-purple-600">
          Mini CRM
        </div>
        <div className="flex-1 flex items-center justify-center">Loading...</div>
      </aside>
    );
  }

  return (
    <aside className="bg-gradient-to-b from-gray-900 to-gray-800 text-white w-64 min-h-screen flex flex-col transition-all duration-300 md:relative fixed z-40 shadow-2xl">
      <div className="p-6 text-2xl font-bold tracking-wide border-b border-gray-700 bg-gradient-to-r from-blue-600 to-purple-600">
        Mini CRM
      </div>
      <nav className="flex-1 p-4 space-y-2">
        {navItems.filter((item) => item.show).map((item) => {
          const Icon = item.icon;
          const active = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group font-medium ${
                active
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg scale-105"
                  : "hover:bg-gray-700 hover:text-blue-400 text-gray-300"
              }`}
            >
              <Icon className={`w-5 h-5 transition-transform duration-200 ${active ? "scale-110" : "group-hover:scale-110"}`} />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>
      {user && (
        <div className="p-4 border-t border-gray-700 bg-gray-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
              <span className="text-white font-semibold text-sm">{user.name?.charAt(0) || "U"}</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white text-sm font-semibold truncate">{user.name}</p>
              <p className="text-gray-400 text-xs truncate">{user.email}</p>
            </div>
          </div>
        </div>
      )}
      <div className="p-4 border-t border-gray-700 text-xs text-gray-400 text-center">
        &copy; {new Date().getFullYear()} Mini CRM
      </div>
    </aside>
  );
}
