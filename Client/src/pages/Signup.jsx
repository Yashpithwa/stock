// src/pages/Signup.jsx
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import background from "../assets/Forex_First_Page.jpeg";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post("http://localhost:5000/auth/signup", {
        name,
        email,
        password,
      });

      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        navigate("/InstPage");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col text-white overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center animate-pulse-slow"
        style={{ backgroundImage: `url(${background})` }}
      ></div>
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>

      {/* Navbar */}
      <nav className="relative z-10 flex justify-center p-6">
        <h1 className="text-4xl font-extrabold text-green-400 drop-shadow-lg tracking-widest animate-glow">
          Trend<span className="text-white">Titan</span>
        </h1>
      </nav>

      {/* Signup Card */}
      <div className="relative z-10 flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md bg-black/50 p-8 rounded-3xl border border-green-400/40 shadow-[0_0_25px_rgba(34,197,94,0.6)] animate-fadeIn backdrop-blur-md">
          <h2 className="text-3xl font-bold mb-6 text-center text-green-400 tracking-wide animate-pulse">
            Create Account
          </h2>

          {error && (
            <p className="text-red-500 mb-4 text-center font-medium">{error}</p>
          )}

          <form onSubmit={handleSignup} className="space-y-5">
            {/* Name */}
            <div className="relative group">
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-3 pl-12 border border-green-400/50 rounded-xl bg-black/40 placeholder-green-300 text-white focus:outline-none focus:ring-2 focus:ring-green-400 group-hover:shadow-[0_0_15px_rgba(34,197,94,0.7)] transition"
                required
              />
              <FaUser className="absolute left-4 top-3.5 text-green-400" />
            </div>

            {/* Email */}
            <div className="relative group">
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 pl-12 border border-green-400/50 rounded-xl bg-black/40 placeholder-green-300 text-white focus:outline-none focus:ring-2 focus:ring-green-400 group-hover:shadow-[0_0_15px_rgba(34,197,94,0.7)] transition"
                required
              />
              <FaEnvelope className="absolute left-4 top-3.5 text-green-400" />
            </div>

            {/* Password */}
            <div className="relative group">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 pl-12 border border-green-400/50 rounded-xl bg-black/40 placeholder-green-300 text-white focus:outline-none focus:ring-2 focus:ring-green-400 group-hover:shadow-[0_0_15px_rgba(34,197,94,0.7)] transition"
                required
              />
              <FaLock className="absolute left-4 top-3.5 text-green-400" />
            </div>

            {/* Button */}
            <button
              type="submit"
              className="w-full py-3 rounded-xl font-bold text-black bg-green-400 hover:bg-green-500 transition transform hover:scale-105 shadow-[0_0_20px_rgba(34,197,94,0.7)] animate-bounce"
            >
              Sign Up
            </button>
          </form>

          {/* Links */}
          <div className="mt-6 text-center text-green-300">
            Already have an account?{" "}
            <span
              className="text-green-400 hover:underline cursor-pointer"
              onClick={() => navigate("/login")}
            >
              Login
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
