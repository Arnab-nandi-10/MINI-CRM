import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Admin() {
  const [stats, setStats] = useState({
    totalClients: 0,
    totalLeads: 0,
    totalTasks: 0,
    activeLeads: 0,
    convertedLeads: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/dashboard/stats", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setStats({
          totalClients: res.data.totalClients || 0,
          totalLeads: (res.data.activeLeads || 0) + (res.data.convertedLeads || 0) + (res.data.lostLeads || 0),
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
    { label: "Total Clients", value: stats.totalClients, icon: "👥", color: "from-blue-600 to-blue-700" },
    { label: "Total Leads", value: stats.totalLeads, icon: "📊", color: "from-purple-600 to-purple-700" },
    { label: "Active Leads", value: stats.activeLeads, icon: "⚡", color: "from-yellow-600 to-yellow-700" },
    { label: "Converted Leads", value: stats.convertedLeads, icon: "✅", color: "from-green-600 to-green-700" },
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Admin Dashboard</h1>
        <p className="text-gray-600">Manage your CRM system and view key performance metrics</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {cards.map((card) => (
          <div
            key={card.label}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition transform hover:scale-105"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium mb-2">{card.label}</p>
                <p className="text-4xl font-bold text-gray-800">
                  {loading ? "..." : card.value}
                </p>
              </div>
              <div className={`bg-gradient-to-br ${card.color} text-white text-3xl p-4 rounded-lg`}>
                {card.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Admin Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
            <span className="mr-2">🔧</span> System Management
          </h2>
          <div className="space-y-3">
            <button className="w-full text-left px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:shadow-lg transition font-semibold flex items-center">
              <span className="mr-3">📋</span> View All Leads
            </button>
            <button className="w-full text-left px-4 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg hover:shadow-lg transition font-semibold flex items-center">
              <span className="mr-3">👥</span> Manage Clients
            </button>
            <button className="w-full text-left px-4 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-lg hover:shadow-lg transition font-semibold flex items-center">
              <span className="mr-3">✓</span> View All Tasks
            </button>
            <button className="w-full text-left px-4 py-3 bg-gradient-to-r from-orange-600 to-orange-700 text-white rounded-lg hover:shadow-lg transition font-semibold flex items-center">
              <span className="mr-3">📊</span> Generate Reports
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
            <span className="mr-2">⚙️</span> Settings
          </h2>
          <div className="space-y-3">
            <button className="w-full text-left px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition font-semibold flex items-center">
              <span className="mr-3">👤</span> User Management
            </button>
            <button className="w-full text-left px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition font-semibold flex items-center">
              <span className="mr-3">🔒</span> Security Settings
            </button>
            <button className="w-full text-left px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition font-semibold flex items-center">
              <span className="mr-3">🌐</span> System Configuration
            </button>
            <button className="w-full text-left px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition font-semibold flex items-center">
              <span className="mr-3">📧</span> Email Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
