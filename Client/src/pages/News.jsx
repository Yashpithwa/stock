import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserCircle, FaChartLine, FaBolt } from "react-icons/fa";
import { TrendingUp, Menu, X } from "lucide-react";

const News = ({ stocks = ["stocks"] }) => {
  const navigate = useNavigate();
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userName, setUserName] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const query = stocks.join(",");

  const navLinks = [
    { text: "Prediction", path: "/FrontPage/StockPrediction" },
    { text: "News", path: "/FrontPage/News" },
    { text: "AI Assistant", path: "/FrontPage/Ai" },
    { text: "Invest Planning", path: "/FrontPage/Invest" },
    { text: "Pivot Planning Calculator", path: "/FrontPage/Pivot" },
  ];

  useEffect(() => {
    setLoading(true);
    setError(null);

    fetch(`http://localhost:5000/api/news?q=${query}`)
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((data) => {
        setNews(data.articles || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching news:", err);
        setError("Failed to load news. Try again later.");
        setLoading(false);
      });

    const storedName = localStorage.getItem("userName");
    if (storedName) setUserName(storedName);
  }, [query]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-slate-100 font-sans overflow-hidden">
      {/* Floating Particles */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-2 h-2 bg-gradient-to-r from-green-400 to-blue-500 rounded-full opacity-20 animate-float-${(i % 3) + 1}`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-lg border-b border-green-500/20">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-3">
          {/* Logo */}
          <div onClick={() => navigate("/FrontPage")} className="flex items-center space-x-3 cursor-pointer group">
            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-blue-500 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
              <TrendingUp className="w-6 h-6 text-white group-hover:rotate-12 transition-transform" />
            </div>
            <span className="text-2xl font-black group-hover:text-green-400 transition-colors">TrendTitan</span>
          </div>

          {/* Desktop Navbar */}
          <div className="hidden md:flex items-center justify-between w-full ml-10">
            <div className="flex items-center space-x-6">
              {navLinks.map((link) => (
                <button
                  key={link.text}
                  onClick={() => navigate(link.path)}
                  className="px-4 py-1.5 rounded-full font-medium text-slate-200 hover:text-white hover:bg-green-500/20 transition-all duration-200"
                >
                  {link.text}
                </button>
              ))}
            </div>
            <div className="flex items-center space-x-2 cursor-pointer group">
              <span className="text-green-400 font-semibold group-hover:text-white transition-colors">{userName}</span>
              <FaUserCircle className="text-3xl text-green-400 group-hover:text-white transition-colors" />
            </div>
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
            {navLinks.map((link) => (
              <button
                key={link.text}
                onClick={() => {
                  navigate(link.path);
                  setIsOpen(false);
                }}
                className="w-full px-4 py-2 rounded-lg text-slate-200 hover:text-white hover:bg-green-500/20 transition-all duration-200 text-left"
              >
                {link.text}
              </button>
            ))}
            <div className="flex items-center space-x-2 mt-4">
              <span className="text-green-400 font-semibold">{userName}</span>
              <FaUserCircle className="text-3xl text-green-400" />
            </div>
          </div>
        )}
      </nav>

      {/* News Section */}
      <div className="pt-28 p-6 relative z-10 max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-black text-green-400 mb-8 flex items-center gap-3 animate-slideUp">
          <FaBolt className="text-yellow-400" /> Stock News Buzz
        </h1>

        {loading && <div className="text-slate-400 animate-pulse">Loading news...</div>}
        {error && <div className="text-red-500">{error}</div>}
        {!loading && !error && news.length === 0 && (
          <div className="text-slate-400">No news found for selected stocks.</div>
        )}

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-6">
          {news.map((item, idx) => (
            <div
              key={idx}
              className="bg-slate-900/60 backdrop-blur-sm rounded-2xl shadow-lg border border-slate-800 hover:border-green-400/40 overflow-hidden group cursor-pointer hover:scale-105 transition-transform duration-500"
            >
              <div className="w-full h-48 bg-slate-800 flex items-center justify-center overflow-hidden relative">
                <img
                  src={item.urlToImage || "https://via.placeholder.com/400x200?text=No+Image"}
                  alt={item.title}
                  className="w-full h-full object-cover transition duration-500 group-hover:brightness-75"
                />
                <FaChartLine className="absolute top-3 right-3 text-green-400 text-2xl opacity-0 group-hover:opacity-100 animate-pulse transition" />
              </div>
              <div className="p-5 flex flex-col">
                <h2 className="font-bold text-lg text-white group-hover:text-green-400 transition">{item.title}</h2>
                <p className="text-sm text-slate-400 mt-1 line-clamp-3">{item.description}</p>
                <p className="text-xs text-slate-500 mt-2">{new Date(item.publishedAt).toLocaleString()}</p>
                <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-green-400 mt-3 inline-block font-semibold hover:underline">
                  Read more →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default News;
