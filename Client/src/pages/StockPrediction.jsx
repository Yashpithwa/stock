import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaHeart, FaUserCircle } from "react-icons/fa";
import { TrendingUp, Menu, X } from "lucide-react";

/* ===== 35 STOCKS ===== */
const stocks = [
  "AAPL","GOOGL","MSFT","TSLA","AMZN","NVDA","META","NFLX","AMD","INTC",
  "ORCL","IBM","ADBE","PYPL","SHOP","BABA","V","MA","DIS","CSCO",
  "CRM","ACN","QCOM","TXN","COST","WMT","NKE","SBUX","ADP","LIN",
  "HON","GE","UPS","CAT","MMM"
];

const StockPrediction = () => {
  const navigate = useNavigate();
  const [stockData, setStockData] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [favorites, setFavorites] = useState({});
  const [userName] = useState("");
  const [stockLoading, setStockLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { text: "Prediction", path: "/FrontPage/StockPrediction" },
    { text: "News", path: "/FrontPage/News" },
    { text: "AI Assistant", path: "/FrontPage/Ai" },
    { text: "Invest Planning", path: "/FrontPage/Invest" },
    { text: "Pivot Planning Calculator", path: "/FrontPage/Pivot" },
  ];

  const userId = localStorage.getItem("userId") || "demoUser";

  const handleStockClick = (symbol) => navigate(`/StockPage/${symbol}`);

  const toggleFavorite = async (symbol) => {
    if (favorites[symbol]) return;
    setFavorites((prev) => ({ ...prev, [symbol]: true }));
    try {
      await fetch("http://localhost:5000/api/watchlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, symbol }),
      });
    } catch (error) {
      console.error("Error adding to watchlist:", error);
    }
  };

  const fetchPrices = async () => {
    setStockLoading(true);
    try {
      const requests = stocks.map((stock) =>
        fetch(`http://localhost:5000/api/price/${stock}`)
          .then((res) => (res.ok ? res.json() : null))
          .then((data) => (data ? { [stock]: { price: data.price, diff: data.difference } } : {}))
      );
      const results = await Promise.all(requests);
      const mergedData = results.reduce((acc, curr) => ({ ...acc, ...curr }), {});
      setStockData(mergedData);
    } catch (error) {
      console.error("Error fetching stock prices:", error);
    }
    setStockLoading(false);
  };

  useEffect(() => {
    fetchPrices();
    const interval = setInterval(fetchPrices, 600000); // Refresh every 10 min
    return () => clearInterval(interval);
  }, []);

  const filteredStocks = stocks.filter((stock) =>
    stock.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-slate-100 overflow-hidden font-sans">
      
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

            {/* User Info */}
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

      {/* Hero */}
      <section className="pt-28 pb-10 text-center relative z-10">
        <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight">Stock Predictions</h1>
        <p className="text-slate-400 text-lg md:text-xl">
          Track real-time prices and trends with our AI-powered stock dashboard.
        </p>
      </section>

      {/* Search */}
      <div className="px-6 pb-6 relative z-10 max-w-7xl mx-auto">
        <input
          type="text"
          placeholder="Search stock..."
          className="mb-6 p-3 rounded-xl text-green-400 w-full md:w-1/3 bg-slate-900/60 border border-green-400/50 focus:outline-none focus:ring-2 focus:ring-green-400/80 placeholder-green-400/70 transition"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        {/* Stock Grid */}
        {stockLoading ? (
          <div className="flex flex-col justify-center items-center h-64">
            <div className="loader border-t-4 border-green-400 border-solid rounded-full w-12 h-12 animate-spin shadow-md"></div>
            <span className="mt-4 text-green-400 font-semibold">Loading stock data...</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-6">
            {filteredStocks.map((stock, idx) => {
              const data = stockData[stock];
              const isFavorite = favorites[stock];
              return (
                <div
                  key={idx}
                  className="bg-slate-900/60 backdrop-blur-sm p-5 rounded-2xl shadow-lg border border-slate-800 hover:border-green-400/40 hover:scale-105 transition-transform cursor-pointer relative flex flex-col justify-between h-48"
                  onClick={() => handleStockClick(stock)}
                >
                  <FaHeart
                    className={`absolute top-3 right-3 cursor-pointer z-10 transition-transform transform hover:scale-125 ${isFavorite ? "text-red-500" : "text-gray-400/70"}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(stock);
                    }}
                  />
                  <div>
                    <span className="text-xl font-bold">{stock}</span>
                    <span className="text-gray-300 mt-2 text-lg block">
                      {data?.price != null ? `$${Number(data.price).toFixed(2)}` : "---"}
                    </span>
                    {data?.diff != null && (
                      <span className={`mt-1 font-semibold text-lg ${data.diff > 0 ? "text-green-400" : data.diff < 0 ? "text-red-400" : "text-gray-400"}`}>
                        {data.diff > 0 ? `+${Number(data.diff).toFixed(2)}` : Number(data.diff).toFixed(2)}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default StockPrediction;
