import React, { useState } from "react";
import axios from "axios";

const AuthPage = () => {
  const [panelOpen, setPanelOpen] = useState(false);
  const [mode, setMode] = useState("login"); // "login" or "register"

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      window.location.href = "/";
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await axios.post("http://localhost:5000/api/auth/register", {
        name,
        email,
        password,
      });

      setMode("login");
      setError("Account created! Please login.");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative w-full min-h-screen bg-gradient-to-br from-[#0B1020] via-[#0F172A] to-[#1E1B4B] text-white overflow-hidden">

      {/* NAV BAR */}
      <div className="absolute top-0 left-0 w-full flex justify-between items-center px-10 py-6">
        <div className="flex items-center space-x-3">
          <div className="bg-indigo-600 p-2 rounded-lg">
            ⚡
          </div>
          <span className="text-xl font-semibold">Mini CRM</span>
        </div>

        <div className="space-x-4">
          <button
            onClick={() => { setPanelOpen(true); setMode("login"); }}
            className="px-5 py-2 border border-indigo-400 rounded-lg hover:bg-indigo-500 transition"
          >
            Login
          </button>

          <button
            onClick={() => { setPanelOpen(true); setMode("register"); }}
            className="px-5 py-2 bg-indigo-600 rounded-lg hover:bg-indigo-700 transition"
          >
            Create Account
          </button>
        </div>
      </div>

      {/* MAIN HERO SECTION */}
      <div className="flex flex-col justify-center items-center h-screen text-center px-10">
        <h1 className="text-5xl md:text-6xl font-bold mb-4 animate-fadeIn">
          Smarter way to manage your business.
        </h1>
        <p className="text-gray-300 max-w-2xl mb-10 text-lg">
          Track leads, organize tasks, collaborate with your team, and make
          data-driven decisions — all from one powerful dashboard.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl">
          <FeatureCard title="Real-time Analytics" desc="Understand performance instantly." />
          <FeatureCard title="Secure Access" desc="Role-based permissions & authentication." />
          <FeatureCard title="Task Automation" desc="Streamline workflows and boost productivity." />
        </div>
      </div>

      {/* SLIDING PANEL (RIGHT SIDE) */}
      <div
        className={`fixed top-0 right-0 h-full w-full md:w-1/2 bg-[#0B1020] shadow-2xl transform ${
          panelOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-500 ease-out z-50`}
      >
        {/* Close Button */}
        <button
          onClick={() => setPanelOpen(false)}
          className="absolute top-6 right-6 text-gray-400 hover:text-white text-xl"
        >
          ✖
        </button>

        <div className="flex flex-col justify-center items-center h-full px-10">

          <h2 className="text-3xl font-bold mb-6">
            {mode === "login" ? "Welcome Back" : "Create Account"}
          </h2>

          {error && (
            <div className="bg-red-600 text-white px-4 py-2 rounded mb-4">
              {error}
            </div>
          )}

          {mode === "login" ? (
            <form onSubmit={handleLogin} className="w-full max-w-sm space-y-4">
              <input
                className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <input
                type="password"
                className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <button
                disabled={loading}
                className="w-full bg-indigo-600 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
              >
                {loading ? "Signing in..." : "Login"}
              </button>

              <p className="text-center text-gray-400 mt-4">
                Don’t have an account?{" "}
                <span
                  onClick={() => setMode("register")}
                  className="text-indigo-400 cursor-pointer hover:underline"
                >
                  Create one
                </span>
              </p>
            </form>
          ) : (
            <form onSubmit={handleRegister} className="w-full max-w-sm space-y-4">
              <input
                className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />

              <input
                className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <input
                type="password"
                className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <button
                disabled={loading}
                className="w-full bg-indigo-600 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
              >
                {loading ? "Creating..." : "Create Account"}
              </button>

              <p className="text-center text-gray-400 mt-4">
                Already have an account?{" "}
                <span
                  onClick={() => setMode("login")}
                  className="text-indigo-400 cursor-pointer hover:underline"
                >
                  Login
                </span>
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

const FeatureCard = ({ title, desc }) => (
  <div className="bg-[#111827] p-6 rounded-xl border border-gray-800 hover:border-indigo-500 transition">
    <h3 className="text-lg font-semibold mb-2">{title}</h3>
    <p className="text-gray-400 text-sm">{desc}</p>
  </div>
);

export default AuthPage;
