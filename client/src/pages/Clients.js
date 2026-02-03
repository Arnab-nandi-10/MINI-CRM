
import React, { useEffect, useState } from "react";
import axios from "axios";
import ClientModal from "../components/ClientModal";
import { API_ENDPOINTS } from "../config/api";

const Clients = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);

  const fetchClients = async () => {
    setLoading(true);
    setError("");
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(API_ENDPOINTS.CLIENTS, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setClients(res.data);
    } catch (err) {
      setError("Failed to load clients");
      console.error("Clients error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const handleAdd = () => {
    setSelectedClient(null);
    setModalOpen(true);
  };

  const handleEdit = (client) => {
    setSelectedClient(client);
    setModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this client?")) return;
    try {
      const token = localStorage.getItem("token");
      await axios.delete(API_ENDPOINTS.CLIENT(id), {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchClients();
    } catch {
      alert("Failed to delete client");
    }
  };

  const handleSave = async (data) => {
    try {
      const token = localStorage.getItem("token");
      if (selectedClient) {
        await axios.put(API_ENDPOINTS.CLIENT(selectedClient._id), data, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        await axios.post(API_ENDPOINTS.CLIENTS, data, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      setModalOpen(false);
      fetchClients();
    } catch {
      alert("Failed to save client");
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Clients</h1>
          <p className="text-gray-600">Manage your client database</p>
        </div>
        <button
          className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg shadow hover:shadow-lg transform hover:scale-105 transition font-semibold"
          onClick={handleAdd}
        >
          + Add Client
        </button>
      </div>
      {error && <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded mb-4 text-red-700">{error}</div>}
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-100 border-b-2 border-gray-200">
              <tr>
                <th className="text-left p-4 font-semibold text-gray-700">Name</th>
                <th className="text-left p-4 font-semibold text-gray-700">Email</th>
                <th className="text-left p-4 font-semibold text-gray-700">Phone</th>
                <th className="p-4 font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={4} className="text-center p-4">Loading...</td></tr>
              ) : clients.length === 0 ? (
                <tr><td colSpan={4} className="text-center p-4">No clients found.</td></tr>
              ) : (
                clients.map((client) => (
                  <tr key={client._id} className="border-t hover:bg-gray-50 transition">
                    <td className="p-4">{client.name}</td>
                    <td className="p-4">{client.email}</td>
                    <td className="p-4">{client.phone || "N/A"}</td>
                    <td className="p-4 space-x-2">
                      <button className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600" onClick={() => handleEdit(client)}>Edit</button>
                      <button className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600" onClick={() => handleDelete(client._id)}>Delete</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      <ClientModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
        client={selectedClient}
      />
    </div>
  );
};

export default Clients;
