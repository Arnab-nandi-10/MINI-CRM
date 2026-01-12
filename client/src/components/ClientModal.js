import React, { useState, useEffect } from "react";

export default function ClientModal({ open, onClose, onSave, client }) {
  const [form, setForm] = useState({ name: "", email: "", phone: "" });

  useEffect(() => {
    if (client) setForm(client);
    else setForm({ name: "", email: "", phone: "" });
  }, [client, open]);

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
        <h2 className="text-xl font-bold mb-4">{client ? "Edit Client" : "Add Client"}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input name="name" value={form.name} onChange={handleChange} className="w-full border rounded p-2" placeholder="Name" required />
          <input name="email" value={form.email} onChange={handleChange} className="w-full border rounded p-2" placeholder="Email" type="email" required />
          <input name="phone" value={form.phone} onChange={handleChange} className="w-full border rounded p-2" placeholder="Phone" required />
          <div className="flex justify-end">
            <button type="button" className="mr-2 px-4 py-2 bg-gray-200 rounded" onClick={onClose}>Cancel</button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">{client ? "Update" : "Add"}</button>
          </div>
        </form>
      </div>
    </div>
  );
}
