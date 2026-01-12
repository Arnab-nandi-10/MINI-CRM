
import React, { useEffect, useState } from "react";
import axios from "axios";
import TaskModal from "../components/TaskModal";
import TaskCalendar from "../components/TaskCalendar";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const fetchTasks = async () => {
    setLoading(true);
    setError("");
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/api/tasks", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(res.data);
    } catch (err) {
      setError("Failed to load tasks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleAdd = () => {
    setSelectedTask(null);
    setModalOpen(true);
  };

  const handleEdit = (task) => {
    setSelectedTask(task);
    setModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this task?")) return;
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/tasks/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchTasks();
    } catch {
      alert("Failed to delete task");
    }
  };

  const handleSave = async (data) => {
    try {
      const token = localStorage.getItem("token");
      if (selectedTask) {
        await axios.put(`http://localhost:5000/api/tasks/${selectedTask._id}`, data, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        await axios.post("http://localhost:5000/api/tasks", data, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      setModalOpen(false);
      fetchTasks();
    } catch {
      alert("Failed to save task");
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Tasks & Meetings</h1>
          <p className="text-gray-600">Manage your tasks and schedule meetings</p>
        </div>
        <button
          className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg shadow hover:shadow-lg transform hover:scale-105 transition font-semibold"
          onClick={handleAdd}
        >
          + Add Task
        </button>
      </div>
      {error && <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded mb-4 text-red-700">{error}</div>}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-100 border-b-2 border-gray-200">
                  <tr>
                    <th className="text-left p-4 font-semibold text-gray-700">Title</th>
                    <th className="text-left p-4 font-semibold text-gray-700">Due Date</th>
                    <th className="text-left p-4 font-semibold text-gray-700">Status</th>
                    <th className="p-4 font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr><td colSpan={4} className="text-center p-4">Loading...</td></tr>
                  ) : tasks.length === 0 ? (
                    <tr><td colSpan={4} className="text-center p-4">No tasks found.</td></tr>
                  ) : (
                    tasks.map((task) => (
                      <tr key={task._id} className="border-t hover:bg-gray-50 transition">
                        <td className="p-4">{task.title}</td>
                        <td className="p-4">{task.deadline ? new Date(task.deadline).toLocaleDateString() : "-"}</td>
                        <td className="p-4">
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                            task.status === "Completed" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                          }`}>{task.status}</span>
                        </td>
                        <td className="p-4 space-x-2">
                          <button className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600" onClick={() => handleEdit(task)}>Edit</button>
                          <button className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600" onClick={() => handleDelete(task._id)}>Delete</button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="lg:col-span-1">
          <TaskCalendar />
        </div>
      </div>
      <TaskModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
        task={selectedTask}
      />
      <TaskCalendar />
    </div>
  );
};

export default Tasks;
