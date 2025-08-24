import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { FaUserCircle, FaSignOutAlt, FaEnvelope, FaGoogle } from 'react-icons/fa';
import { motion } from "framer-motion";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token'); 
    if (!token) {
      navigate("/login"); 
      return;
    }

    axios.get("http://localhost:5000/api/profile", {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => {
      if (!res.data || !res.data.name) {
        navigate("/login"); 
      } else {
        setUser(res.data);
      }
      setLoading(false);
    })
    .catch(err => {
      console.error("Profile fetch error:", err);
      if (err.response?.status === 401) navigate("/login"); 
      setLoading(false);
    });
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-slate-900">
        <div className="loader border-t-4 border-green-400 border-solid rounded-full w-12 h-12 animate-spin"></div>
      </div>
    );
  }

  if (!user) {
    return <div className="text-center py-20 text-red-500">User not found</div>;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="bg-gradient-to-r from-green-500 to-emerald-600 shadow-md py-5">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6">
          <h1 className="text-2xl font-bold text-white">Profile</h1>
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-xl text-white hover:bg-white/20 transition"
          >
            <FaSignOutAlt /> <span>Logout</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-6xl mx-auto w-full px-6 py-10">
        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl rounded-2xl p-8 flex flex-col md:flex-row items-center md:items-start gap-8"
        >
          <FaUserCircle className="text-green-400 drop-shadow-lg w-28 h-28 md:w-32 md:h-32" />
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-3xl font-bold text-white mb-2">{user.name}</h2>
            <div className="flex items-center justify-center md:justify-start gap-2 text-slate-300 mb-2">
              <FaEnvelope className="text-green-400" /> {user.email}
            </div>
            {user.googleId && (
              <div className="flex items-center justify-center md:justify-start gap-2 text-slate-300">
                <FaGoogle className="text-red-500" /> {user.googleId}
              </div>
            )}
          </div>
        </motion.div>

        {/* Info Sections */}
        <section className="mt-12 grid md:grid-cols-2 gap-8">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-2xl shadow-md"
          >
            <h3 className="text-xl font-semibold text-green-400 mb-3">About Our Company</h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              <span className="font-semibold">TrendTitan</span> is an AI-powered trading platform that provides advanced 
              market predictions, real-time analytics, and smart risk management tools 
              to maximize your investments.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-2xl shadow-md"
          >
            <h3 className="text-xl font-semibold text-green-400 mb-3">What We Do</h3>
            <ul className="list-disc list-inside text-slate-300 text-sm space-y-2">
              <li>AI Stock Predictions</li>
              <li>Real-time Analytics</li>
              <li>Investment Planning</li>
              <li>Risk Management Tools</li>
              <li>Portfolio Optimization</li>
            </ul>
          </motion.div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-950/80 border-t border-white/10 text-slate-400 py-6 mt-auto">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p>&copy; {new Date().getFullYear()} TrendTitan. All rights reserved.</p>
          <div className="flex space-x-6">
            <a href="/about" className="hover:text-green-400 transition">About</a>
            <a href="/contact" className="hover:text-green-400 transition">Contact</a>
            <a href="/privacy" className="hover:text-green-400 transition">Privacy Policy</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Profile;
