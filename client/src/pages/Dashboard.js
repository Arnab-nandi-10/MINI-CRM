import React, { useEffect, useState } from "react";
import axios from "axios";
import DashboardCharts from "../components/DashboardCharts";

const Dashboard = () => {
  const [stats, setStats] = useState({
    clients: 0,
    leads: 0,
    tasks: 0,
    convertedLeads: 0,
    activeLeads: 0,
    lostLeads: 0,
    monthlyLeads: [],
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      setError("");

      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
          "http://localhost:5000/api/dashboard/stats",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setStats({
          clients: res.data.totalClients || 0,
          leads:
            (res.data.activeLeads || 0) +
            (res.data.convertedLeads || 0) +
            (res.data.lostLeads || 0),
          tasks: res.data.pendingFollowUps || 0,
          convertedLeads: res.data.convertedLeads || 0,
          activeLeads: res.data.activeLeads || 0,
          lostLeads: res.data.lostLeads || 0,
          monthlyLeads: res.data.monthlyLeads || [],
        });
      } catch (err) {
        console.error("Dashboard error:", err);
        setError("Failed to load dashboard stats");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="p-6 bg-[#F5F7FB] min-h-screen">
      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">
          Here’s what’s happening in your CRM today.
        </p>
      </div>

      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded mb-6 text-red-700">
          {error}
        </div>
      )}

      {/* TOP METRICS - More SaaS Style */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-2xl shadow-sm p-5 border border-gray-100">
          <p className="text-gray-500 text-sm">Total Clients</p>
          <p className="text-2xl font-bold mt-1">
            {loading ? "..." : stats.clients}
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-5 border border-gray-100">
          <p className="text-gray-500 text-sm">Active Leads</p>
          <p className="text-2xl font-bold mt-1">
            {loading ? "..." : stats.activeLeads}
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-5 border border-gray-100">
          <p className="text-gray-500 text-sm">Converted Leads</p>
          <p className="text-2xl font-bold mt-1">
            {loading ? "..." : stats.convertedLeads}
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-5 border border-gray-100">
          <p className="text-gray-500 text-sm">Pending Tasks</p>
          <p className="text-2xl font-bold mt-1">
            {loading ? "..." : stats.tasks}
          </p>
        </div>
      </div>

      {/* MAIN CONTENT GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT BIG CHART */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
          <h2 className="text-lg font-semibold mb-4">Performance Overview</h2>

          {loading ? (
            <div className="h-64 bg-gray-100 animate-pulse rounded-xl"></div>
          ) : (
            <DashboardCharts
              stats={stats}
              monthlyLeads={stats.monthlyLeads}
            />
          )}
        </div>

        {/* RIGHT SIDE ACTIVITY PANEL */}
        <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
          <h2 className="text-lg font-semibold mb-4">Quick Insights</h2>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Lead Conversion Rate</span>
              <span className="font-semibold text-green-600">
                {stats.leads > 0
                  ? Math.round(
                      (stats.convertedLeads / stats.leads) * 100
                    )
                  : 0}
                %
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-gray-600">Active vs Lost Leads</span>
              <span className="font-semibold text-blue-600">
                {stats.activeLeads} / {stats.lostLeads}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-gray-600">Pending Follow-ups</span>
              <span className="font-semibold text-orange-600">
                {stats.tasks}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
