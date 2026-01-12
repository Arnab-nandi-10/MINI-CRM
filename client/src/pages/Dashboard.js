
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
        const res = await axios.get("http://localhost:5000/api/dashboard/stats", {
          headers: { Authorization: `Bearer ${token}` },
        });
        // Map backend keys to frontend keys for charts
        setStats({
          clients: res.data.totalClients || 0,
          leads: (res.data.activeLeads || 0) + (res.data.convertedLeads || 0) + (res.data.lostLeads || 0),
          tasks: res.data.pendingFollowUps || 0,
          convertedLeads: res.data.convertedLeads || 0,
          activeLeads: res.data.activeLeads || 0,
          lostLeads: res.data.lostLeads || 0,
          monthlyLeads: res.data.monthlyLeads || [],
        });
      } catch (err) {
        console.error("Dashboard error:", err);
        setError(`Failed to load dashboard stats: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {[{
          label: "Total Clients",
          value: stats.clients
        }, {
          label: "Active Leads",
          value: stats.activeLeads
        }, {
          label: "Converted Leads",
          value: stats.convertedLeads
        }].map((card, idx) => (
          <div key={card.label} className="bg-white shadow rounded p-4 flex flex-col justify-center items-center min-h-[100px]">
            <div className="text-gray-500">{card.label}</div>
            <div className="text-2xl font-bold">
              {loading ? (
                <span className="animate-pulse bg-gray-200 rounded w-12 h-6 inline-block" />
              ) : (
                card.value
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1,2,3].map((i) => (
              <div key={i} className="bg-white rounded shadow p-4 min-h-[250px] animate-pulse" />
            ))}
          </div>
        ) : (
          <DashboardCharts stats={stats} monthlyLeads={stats.monthlyLeads} />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
