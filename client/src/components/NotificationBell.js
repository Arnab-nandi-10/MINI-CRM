import React, { useEffect, useState } from "react";
import axios from "axios";

export default function NotificationBell() {
  const [notifications, setNotifications] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Placeholder: fetch notifications from API in real app
    setNotifications([
      { id: 1, message: "New client added", read: false },
      { id: 2, message: "Lead converted", read: false },
    ]);
  }, []);

  return (
    <div className="relative">
      <button className="relative" onClick={() => setOpen((v) => !v)}>
        <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
        {notifications.some((n) => !n.read) && (
          <span className="absolute top-0 right-0 block w-2 h-2 bg-red-500 rounded-full"></span>
        )}
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded z-50">
          <div className="p-2 font-bold border-b">Notifications</div>
          {notifications.length === 0 ? (
            <div className="p-2 text-gray-500">No notifications</div>
          ) : (
            notifications.map((n) => (
              <div key={n.id} className="p-2 border-b last:border-b-0 text-sm text-gray-700">
                {n.message}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
