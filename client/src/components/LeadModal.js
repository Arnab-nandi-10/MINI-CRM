import React, { useState, useEffect } from "react";
import axios from "axios";

export default function LeadModal({ open, onClose, onSave, lead }) {
  const [form, setForm] = useState({ name: "", email: "", status: "Active", client: "" });
  const [clients, setClients] = useState([]);
  const [loadingClients, setLoadingClients] = useState(false);

  useEffect(() => {
    if (lead) setForm({ ...lead, client: lead.client?._id || lead.client || "" });
    else setForm({ name: "", email: "", status: "Active", client: "" });
  }, [lead, open]);

  useEffect(() => {
    if (open) {
      setLoadingClients(true);
      const token = localStorage.getItem("token");
      axios
        .get("http://localhost:5000/api/clients", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => setClients(res.data))
        .catch(() => setClients([]))
        .finally(() => setLoadingClients(false));
    }
  }, [open]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
  };

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded shadow-lg w-full max-w-md p-6 relative">
        <button className="absolute top-2 right-2 text-gray-400 hover:text-gray-700" onClick={onClose}>&times;</button>
        <h2 className="text-xl font-bold mb-4">{lead ? "Edit Lead" : "Add Lead"}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input name="name" value={form.name} onChange={handleChange} className="w-full border rounded p-2" placeholder="Name" required />
          <input name="email" value={form.email} onChange={handleChange} className="w-full border rounded p-2" placeholder="Email" type="email" required />
          <select name="client" value={form.client} onChange={handleChange} className="w-full border rounded p-2" required>
            <option value="">{loadingClients ? "Loading clients..." : "Select Client"}</option>
            {clients.map((c) => (
              <option key={c._id} value={c._id}>{c.name}</option>
            ))}
          </select>
          <select name="status" value={form.status} onChange={handleChange} className="w-full border rounded p-2">
            <option value="Active">Active</option>
            <option value="Converted">Converted</option>
            <option value="Lost">Lost</option>
          </select>
          <div className="flex justify-end">
            <button type="button" className="mr-2 px-4 py-2 bg-gray-200 rounded" onClick={onClose}>Cancel</button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">{lead ? "Update" : "Add"}</button>
          </div>
        </form>
      </div>
    </div>
  );
}
