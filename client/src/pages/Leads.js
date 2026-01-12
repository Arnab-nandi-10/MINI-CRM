
import React, { useEffect, useState } from "react";
import axios from "axios";
import LeadModal from "../components/LeadModal";

const Leads = () => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState(null);

  const fetchLeads = async () => {
    setLoading(true);
    setError("");
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/api/leads", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setLeads(res.data);
    } catch (err) {
      setError("Failed to load leads");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const handleAdd = () => {
    setSelectedLead(null);
    setModalOpen(true);
  };

  const handleEdit = (lead) => {
    setSelectedLead(lead);
    setModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this lead?")) return;
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/leads/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchLeads();
    } catch {
      alert("Failed to delete lead");
    }
  };

  const handleSave = async (data) => {
    try {
      const token = localStorage.getItem("token");
      if (selectedLead) {
        await axios.put(`http://localhost:5000/api/leads/${selectedLead._id}`, data, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        await axios.post("http://localhost:5000/api/leads", data, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      setModalOpen(false);
      fetchLeads();
    } catch {
      alert("Failed to save lead");
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Leads</h1>
          <p className="text-gray-600">Manage and track your sales leads</p>
        </div>
        <button
          className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg shadow hover:shadow-lg transform hover:scale-105 transition font-semibold"
          onClick={handleAdd}
        >
          + Add Lead
        </button>
      </div>
      {error && <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded mb-4 text-red-700">{error}</div>}
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-100 border-b-2 border-gray-200">
              <tr>
                <th className="text-left p-4 font-semibold text-gray-700">Client Name</th>
                <th className="text-left p-4 font-semibold text-gray-700">Email</th>
                <th className="text-left p-4 font-semibold text-gray-700">Status</th>
                <th className="p-4 font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={4} className="text-center p-4">Loading...</td></tr>
              ) : leads.length === 0 ? (
                <tr><td colSpan={4} className="text-center p-4">No leads found.</td></tr>
              ) : (
                leads.map((lead) => (
                  <tr key={lead._id} className="border-t hover:bg-gray-50 transition">
                    <td className="p-4">{lead.client?.name || "Unknown"}</td>
                    <td className="p-4">{lead.client?.email || "N/A"}</td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        lead.status === "Converted" ? "bg-green-100 text-green-800" :
                        lead.status === "Lost" ? "bg-red-100 text-red-800" :
                        lead.status === "In Progress" ? "bg-yellow-100 text-yellow-800" :
                        "bg-blue-100 text-blue-800"
                      }`}>{lead.status}</span>
                    </td>
                    <td className="p-4 space-x-2">
                      <button className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600" onClick={() => handleEdit(lead)}>Edit</button>
                      <button className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600" onClick={() => handleDelete(lead._id)}>Delete</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      <LeadModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
        lead={selectedLead}
      />
    </div>
  );
};

export default Leads;
