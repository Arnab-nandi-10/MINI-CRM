import React, { useState, useEffect } from "react";

export default function TaskModal({ open, onClose, onSave, task }) {
  const [form, setForm] = useState({ title: "", dueDate: "", status: "Pending" });

  useEffect(() => {
    if (task) setForm(task);
    else setForm({ title: "", dueDate: "", status: "Pending" });
  }, [task, open]);

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
        <h2 className="text-xl font-bold mb-4">{task ? "Edit Task" : "Add Task"}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input name="title" value={form.title} onChange={handleChange} className="w-full border rounded p-2" placeholder="Title" required />
          <input name="dueDate" value={form.dueDate} onChange={handleChange} className="w-full border rounded p-2" placeholder="Due Date" type="date" required />
          <select name="status" value={form.status} onChange={handleChange} className="w-full border rounded p-2">
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
            <option value="Overdue">Overdue</option>
          </select>
          <div className="flex justify-end">
            <button type="button" className="mr-2 px-4 py-2 bg-gray-200 rounded" onClick={onClose}>Cancel</button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">{task ? "Update" : "Add"}</button>
          </div>
        </form>
      </div>
    </div>
  );
}
