import React, { useEffect, useState } from "react";
import axios from "axios";

export default function TaskCalendar() {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/tasks", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTasks(res.data);
      } catch {
        setError("Failed to load tasks");
      }
    };
    fetchTasks();
  }, []);

  // Simple calendar: group tasks by due date
  const grouped = tasks.reduce((acc, t) => {
    const date = t.dueDate ? new Date(t.dueDate).toLocaleDateString() : "No Due Date";
    acc[date] = acc[date] || [];
    acc[date].push(t);
    return acc;
  }, {});

  return (
    <div className="bg-white rounded shadow p-4 mt-8">
      <h2 className="text-lg font-bold mb-4">Task Calendar</h2>
      {error && <div className="text-red-500 mb-2">{error}</div>}
      <div className="space-y-4">
        {Object.keys(grouped).length === 0 ? (
          <div>No tasks scheduled.</div>
        ) : (
          Object.entries(grouped).map(([date, tasks]) => (
            <div key={date}>
              <div className="font-semibold text-blue-700 mb-1">{date}</div>
              <ul className="ml-4 list-disc">
                {tasks.map((task) => (
                  <li key={task._id} className="text-gray-700">{task.title} <span className="text-xs text-gray-400">({task.status})</span></li>
                ))}
              </ul>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
