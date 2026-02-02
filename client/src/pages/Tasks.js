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
  const [hoveredRow, setHoveredRow] = useState(null);

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
        await axios.put(
          `http://localhost:5000/api/tasks/${selectedTask._id}`,
          data,
          { headers: { Authorization: `Bearer ${token}` } }
        );
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
      {/* HEADER */}
      <div className="max-w-7xl mx-auto flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Tasks & Meetings
          </h1>
          <p className="text-gray-600 mt-1">
            Plan your work, track progress, and stay organized
          </p>
        </div>

        <button
          onClick={handleAdd}
          className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl shadow-sm hover:shadow-md transition transform hover:scale-[1.02] font-semibold"
        >
          + Add Task
        </button>
      </div>

      {error && (
        <div className="max-w-7xl mx-auto bg-red-50 border-l-4 border-red-500 p-4 rounded mb-6 text-red-700">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {/* TASK TABLE */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
            <div className="px-5 py-4 border-b bg-gray-50">
              <h2 className="text-lg font-semibold text-gray-900">
                Your Tasks
              </h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-100 border-b">
                  <tr>
                    <th className="text-left p-4 text-sm font-medium text-gray-700">
                      Title
                    </th>
                    <th className="text-left p-4 text-sm font-medium text-gray-700">
                      Due Date
                    </th>
                    <th className="text-left p-4 text-sm font-medium text-gray-700">
                      Status
                    </th>
                    <th className="p-4 text-sm font-medium text-gray-700">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan={4} className="text-center p-6 text-gray-500">
                        Loading tasks...
                      </td>
                    </tr>
                  ) : tasks.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="text-center p-6 text-gray-500">
                        No tasks found. Add one to get started.
                      </td>
                    </tr>
                  ) : (
                    tasks.map((task, idx) => (
                      <tr
                        key={task._id}
                        onMouseEnter={() => setHoveredRow(idx)}
                        onMouseLeave={() => setHoveredRow(null)}
                        className={`border-t transition ${
                          hoveredRow === idx
                            ? "bg-blue-50"
                            : "bg-white"
                        }`}
                      >
                        <td className="p-4 font-medium text-gray-900">
                          {task.title}
                        </td>

                        <td className="p-4 text-gray-700">
                          {task.deadline
                            ? new Date(task.deadline).toLocaleDateString()
                            : "—"}
                        </td>

                        <td className="p-4">
                          <span
                            className={`px-3 py-1 rounded-full text-sm font-medium ${
                              task.status === "Completed"
                                ? "bg-green-100 text-green-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {task.status}
                          </span>
                        </td>

                        <td className="p-4 space-x-2">
                          <button
                            onClick={() => handleEdit(task)}
                            className="px-3 py-1 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(task._id)}
                            className="px-3 py-1 bg-rose-500 text-white rounded-lg hover:bg-rose-600 transition"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* CALENDAR PANEL */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm border p-5">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">
              Task Calendar
            </h2>
            <TaskCalendar />
          </div>
        </div>
      </div>

      <TaskModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
        task={selectedTask}
      />
    </div>
  );
};

export default Tasks;
