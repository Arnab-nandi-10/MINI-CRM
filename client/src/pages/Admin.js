import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_ENDPOINTS } from "../config/api";

export default function Admin() {
  const [stats, setStats] = useState({
    totalClients: 0,
    totalLeads: 0,
    totalTasks: 0,
    activeLeads: 0,
    convertedLeads: 0,
  });

  const [loading, setLoading] = useState(true);
  const [hoveredCard, setHoveredCard] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(API_ENDPOINTS.DASHBOARD_STATS, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setStats({
          totalClients: res.data.totalClients || 0,
          totalLeads:
            (res.data.activeLeads || 0) +
            (res.data.convertedLeads || 0) +
            (res.data.lostLeads || 0),
          totalTasks: res.data.pendingFollowUps || 0,
          activeLeads: res.data.activeLeads || 0,
          convertedLeads: res.data.convertedLeads || 0,
        });
      } catch (err) {
        console.error("Failed to fetch admin stats:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const cards = [
    {
      label: "Total Clients",
      value: stats.totalClients,
      sub: "All registered clients",
      color: "bg-blue-50 border-blue-200",
      icon: "👥",
      accent: "text-blue-700",
    },
    {
      label: "Total Leads",
      value: stats.totalLeads,
      sub: "Active + Converted + Lost",
      color: "bg-purple-50 border-purple-200",
      icon: "📊",
      accent: "text-purple-700",
    },
    {
      label: "Active Leads",
      value: stats.activeLeads,
      sub: "Currently in pipeline",
      color: "bg-yellow-50 border-yellow-200",
      icon: "⚡",
      accent: "text-yellow-700",
    },
    {
      label: "Converted Leads",
      value: stats.convertedLeads,
      sub: "Successfully closed",
      color: "bg-green-50 border-green-200",
      icon: "✅",
      accent: "text-green-700",
    },
  ];

  const actions = [
    { label: "View All Leads", icon: "📋", type: "primary" },
    { label: "Manage Clients", icon: "👥", type: "success" },
    { label: "View All Tasks", icon: "✔️", type: "secondary" },
    { label: "Generate Reports", icon: "📊", type: "warning" },
  ];

  const settings = [
    { label: "User Management", icon: "👤" },
    { label: "Security Settings", icon: "🔒" },
    { label: "System Configuration", icon: "🌐" },
    { label: "Email Settings", icon: "📧" },
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* HEADER */}
      <div className="max-w-7xl mx-auto mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-600 mt-1">
          Monitor performance, manage users, and control system settings
        </p>
      </div>

      {/* STATS CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 max-w-7xl mx-auto mb-8">
        {cards.map((card, idx) => (
          <div
            key={card.label}
            onMouseEnter={() => setHoveredCard(idx)}
            onMouseLeave={() => setHoveredCard(null)}
            className={`border rounded-xl p-5 transition-all duration-200 ${
              card.color
            } ${
              hoveredCard === idx
                ? "shadow-lg scale-[1.02]"
                : "shadow-sm scale-100"
            }`}
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  {card.label}
                </p>
                <h2 className={`text-3xl font-bold mt-1 ${card.accent}`}>
                  {loading ? "..." : card.value}
                </h2>
                <p className="text-xs text-gray-500 mt-1">{card.sub}</p>
              </div>
              <div className="text-3xl">{card.icon}</div>
            </div>
          </div>
        ))}
      </div>

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-7xl mx-auto">
        {/* SYSTEM MANAGEMENT */}
        <div className="bg-white rounded-xl shadow-md border p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">
              System Management
            </h2>
            <span className="text-xs text-gray-500">
              Admin-only controls
            </span>
          </div>

          <div className="space-y-3">
            {actions.map((a) => (
              <button
                key={a.label}
                className="w-full flex items-center justify-between px-5 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition"
              >
                <div className="flex items-center gap-3">
                  <span>{a.icon}</span>
                  <span className="font-medium text-gray-800">
                    {a.label}
                  </span>
                </div>
                <span className="text-gray-400">›</span>
              </button>
            ))}
          </div>
        </div>

        {/* SETTINGS */}
        <div className="bg-white rounded-xl shadow-md border p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Settings</h2>
            <span className="text-xs text-gray-500">System preferences</span>
          </div>

          <div className="space-y-3">
            {settings.map((s) => (
              <button
                key={s.label}
                className="w-full flex items-center justify-between px-5 py-3 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition"
              >
                <div className="flex items-center gap-3">
                  <span>{s.icon}</span>
                  <span className="font-medium text-gray-800">
                    {s.label}
                  </span>
                </div>
                <span className="text-gray-400">›</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ACTIVITY FEED (VERY SaaS) */}
      <div className="max-w-7xl mx-auto mt-6 bg-white rounded-xl shadow-md border p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">
          Recent Activity
        </h3>
        <div className="space-y-2 text-sm text-gray-700">
          <p>• Admin updated system settings</p>
          <p>• New client added to the system</p>
          <p>• Weekly report generated</p>
        </div>
      </div>
    </div>
  );
}
