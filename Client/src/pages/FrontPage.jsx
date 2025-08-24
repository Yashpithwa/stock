import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  TrendingUp, Bot, BarChart3, ShieldCheck, Calculator, Brain,
  Menu, X
} from "lucide-react";
import { FaUserCircle } from "react-icons/fa";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from "recharts";

// Mock chart data
const stockData = [
  { name: "Jan", value: 4000, prediction: 4200 },
  { name: "Feb", value: 3000, prediction: 3800 },
  { name: "Mar", value: 2000, prediction: 2900 },
  { name: "Apr", value: 2780, prediction: 3200 },
  { name: "May", value: 1890, prediction: 2100 },
  { name: "Jun", value: 2390, prediction: 2800 },
  { name: "Jul", value: 3490, prediction: 4000 },
];

export default function FrontPage() {
  const navigate = useNavigate();
  const [theme, setTheme] = useState("dark");
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isOpen, setIsOpen] = useState(false);
  const userName = "";

  const navLinks = [
    { text: "Prediction", path: "/FrontPage/StockPrediction" },
    { text: "News", path: "/FrontPage/News" },
    { text: "AI Assistant", path: "/FrontPage/Ai" },
    { text: "Invest Planning", path: "/FrontPage/Invest" },
    { text: "Pivot Planning Calculator", path: "/FrontPage/Pivot" },
    { text: "Compare", path: "/FrontPage/CompareStock" },
  ];

  useEffect(() => {
    if (theme === "dark") document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [theme]);

  useEffect(() => {
    const handleMouseMove = (e) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const toggleTheme = () => setTheme(prev => (prev === "dark" ? "light" : "dark"));

  const NavButton = ({ text, path }) => (
    <button
      onClick={() => {
        navigate(path);
        setIsOpen(false);
      }}
      className="px-4 py-2 rounded-full font-medium text-slate-200 hover:text-white hover:bg-green-500/20 transition-colors duration-200 w-full md:w-auto text-left"
    >
      {text}
    </button>
  );

  return (
    <div className="bg-gradient-to-br from-white via-blue-50/30 to-cyan-50/50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800 text-slate-700 dark:text-slate-200 min-h-screen overflow-x-hidden">
      
      {/* Cursor Glow */}
      <div
        className="fixed pointer-events-none z-[100] w-8 h-8 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full opacity-30 blur-lg transition-all duration-100 ease-out"
        style={{ left: mousePos.x - 16, top: mousePos.y - 16 }}
      />

      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-lg border-b border-green-500/20">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-3">

          {/* Logo */}
          <div onClick={() => navigate("/FrontPage")} className="flex items-center space-x-3 cursor-pointer group">
            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-blue-500 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
              <TrendingUp className="w-6 h-6 text-white group-hover:rotate-12 transition-transform" />
            </div>
            <span className="text-2xl font-black group-hover:text-green-400 transition-colors">
              TrendTitan
            </span>
          </div>

          {/* Desktop Navbar */}
          <div className="hidden md:flex items-center justify-between w-full ml-10">
            <div className="flex items-center space-x-6">
              {navLinks
                .filter(link => link.text !== "Compare") // remove Compare page
                .map(link => <NavButton key={link.text} text={link.text} path={link.path} />)}
            </div>

            {/* Profile Button */}
            <button
              onClick={() => navigate('/FrontPage/Profile')}
              className="flex items-center space-x-2 cursor-pointer group"
            >
              <span className="text-green-400 font-semibold group-hover:text-white transition-colors">{userName}</span>
              <FaUserCircle className="text-3xl text-green-400 group-hover:text-white transition-colors" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-green-400 focus:outline-none">
              {isOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
            </button>
          </div>

        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden bg-slate-950/95 backdrop-blur-lg border-t border-green-500/20 flex flex-col items-start px-4 py-3 space-y-2">
            {navLinks.filter(link => link.text !== "Compare").map(link => <NavButton key={link.text} text={link.text} path={link.path} />)}
            <div className="flex items-center space-x-2 mt-4">
              <span className="text-green-400 font-semibold">{userName}</span>
              <FaUserCircle className="text-3xl text-green-400" />
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="pt-24">
        {/* Hero Section */}
        <section className="text-center py-24 px-4">
          <h1 className="text-6xl md:text-7xl font-black text-slate-900 dark:text-white mb-6 tracking-tight">
            Trade <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">Smarter</span>, Not Harder
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-600 dark:text-slate-400 mb-8">
            AI-powered predictions, real-time analytics, and risk protection — all in one platform.
          </p>

          {/* Chart Preview */}
          <div
            className="mt-16 max-w-4xl mx-auto bg-white/80 dark:bg-slate-900/50 backdrop-blur-sm rounded-2xl shadow-lg p-6 cursor-pointer"
            onClick={() => navigate("/FrontPage/StockPrediction")}
          >
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={stockData}>
                <XAxis dataKey="name" stroke="currentColor" />
                <YAxis stroke="currentColor" />
                <Line type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={3} dot={false} />
                <Line type="monotone" dataKey="prediction" stroke="#a855f7" strokeWidth={3} strokeDasharray="5 5" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-24 px-4 bg-gradient-to-b from-blue-50/30 via-white to-cyan-50/20 dark:from-slate-800/50 dark:via-slate-900 dark:to-slate-950">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-5xl md:text-6xl font-black text-slate-900 dark:text-white mb-6 tracking-tighter">
                An <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">Unfair Advantage</span>
              </h2>
              <p className="max-w-3xl mx-auto text-xl text-slate-600 dark:text-slate-400 font-medium">
                Tools so powerful, they feel like cheating.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <FeatureCard onClick={() => navigate("/FrontPage/StockPrediction")} icon={TrendingUp} title="AI Predictions" description="90.2% accurate predictions that see the future before it happens." iconColor="text-green-500" iconBg="bg-green-500/10" />
              <FeatureCard onClick={() => navigate("/FrontPage/Ai")} icon={Bot} title="Smart Assistant" description="Your personal trading genius available 24/7." iconColor="text-purple-500" iconBg="bg-purple-500/10" />
              <FeatureCard onClick={() => navigate("/FrontPage/StockPrediction/StockPage")} icon={BarChart3} title="Live Analytics" description="Real-time market analysis with interactive charts." iconColor="text-blue-500" iconBg="bg-blue-500/10" />
              <FeatureCard onClick={() => navigate("/FrontPage/Invest")} icon={ShieldCheck} title="Risk Shield" description="Advanced risk management that protects your portfolio." iconColor="text-cyan-500" iconBg="bg-cyan-500/10" />
              <FeatureCard onClick={() => navigate("/FrontPage/Pivot")} icon={Calculator} title="Pivot Calculator" description="Quickly calculate pivot points, support, and resistance levels." iconColor="text-yellow-500" iconBg="bg-yellow-500/10" />
              <FeatureCard onClick={() => navigate("/FrontPage/Invest")} icon={Brain} title="AI Investment" description="Let AI allocate and balance your investments." iconColor="text-pink-500" iconBg="bg-pink-500/10" />
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}

// Feature Card Component
function FeatureCard({ icon: Icon, title, description, iconColor, iconBg, onClick }) {
  return (
    <button
      onClick={onClick}
      className="w-full text-left bg-white/80 dark:bg-slate-900/50 p-6 rounded-2xl shadow-lg border border-slate-200/50 dark:border-slate-800 hover:-translate-y-2 transition-transform cursor-pointer focus:outline-none"
    >
      <div className={`w-12 h-12 flex items-center justify-center rounded-xl mb-4 ${iconBg}`}>
        <Icon className={`w-6 h-6 ${iconColor}`} />
      </div>
      <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{title}</h4>
      <p className="text-sm text-slate-500 dark:text-slate-400">{description}</p>
    </button>
  );
}
