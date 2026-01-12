import React from "react";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

export default function DashboardCharts({ stats, monthlyLeads }) {
  // Overview bar chart
  const barData = {
    labels: ["Clients", "Leads", "Tasks"],
    datasets: [
      {
        label: "Count",
        data: [stats.clients, stats.leads, stats.tasks],
        backgroundColor: ["#2563eb", "#10b981", "#f59e42"],
      },
    ],
  };

  // Pie chart for leads breakdown
  const pieData = {
    labels: ["Converted", "Active", "Lost"],
    datasets: [
      {
        label: "Leads",
        data: [stats.convertedLeads, stats.activeLeads, stats.lostLeads],
        backgroundColor: ["#10b981", "#2563eb", "#ef4444"],
      },
    ],
  };

  // Monthly leads bar chart
  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];
  const monthlyLabels = (monthlyLeads || []).map(
    (m) => `${months[(m._id.month || 1) - 1]} ${m._id.year}`
  );
  const monthlyTotal = (monthlyLeads || []).map((m) => m.total);
  const monthlyConverted = (monthlyLeads || []).map((m) => m.converted);
  const monthlyLost = (monthlyLeads || []).map((m) => m.lost || 0);
  const monthlyBarData = {
    labels: monthlyLabels,
    datasets: [
      {
        label: "Total Leads",
        data: monthlyTotal,
        backgroundColor: "#2563eb",
      },
      {
        label: "Converted",
        data: monthlyConverted,
        backgroundColor: "#10b981",
      },
      {
        label: "Lost",
        data: monthlyLost,
        backgroundColor: "#ef4444",
      },
    ],
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div className="bg-white rounded shadow p-4">
        <h2 className="font-semibold mb-2">Overview</h2>
        <Bar data={barData} />
      </div>
      <div className="bg-white rounded shadow p-4">
        <h2 className="font-semibold mb-2">Leads Breakdown</h2>
        <Pie data={pieData} />
      </div>
      <div className="bg-white rounded shadow p-4 col-span-1 md:col-span-1">
        <h2 className="font-semibold mb-2">Monthly Leads</h2>
        <Bar data={monthlyBarData} />
      </div>
    </div>
  );
}
