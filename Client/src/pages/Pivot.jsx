// src/pages/Pivot.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserCircle, FaArrowUp, FaArrowDown, FaCircle } from "react-icons/fa";
import { TrendingUp, Menu, X } from "lucide-react";

export default function Pivot() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [high, setHigh] = useState("");
  const [low, setLow] = useState("");
  const [close, setClose] = useState("");
  const [results, setResults] = useState(null);
  const [countdown, setCountdown] = useState(5);
  const [showResults, setShowResults] = useState(false);

  const userName = "Yash";
  const navLinks = [
    { text: "Prediction", path: "/FrontPage/StockPrediction" },
    { text: "News", path: "/FrontPage/News" },
    { text: "AI Assistant", path: "/FrontPage/Ai" },
    { text: "Invest Planning", path: "/FrontPage/Invest" },
    { text: "Pivot Planning Calculator", path: "/FrontPage/Pivot" },
  ];

  const calculatePivot = () => {
    const H = parseFloat(high);
    const L = parseFloat(low);
    const C = parseFloat(close);
    if (isNaN(H) || isNaN(L) || isNaN(C)) return alert("Enter valid numbers");

    const P = (H + L + C) / 3;
    const R1 = 2 * P - L;
    const S1 = 2 * P - H;
    const R2 = P + (H - L);
    const S2 = P - (H - L);
    const R3 = H + 2 * (P - L);
    const S3 = L - 2 * (H - P);

    setResults({ P, R1, R2, R3, S1, S2, S3 });
  };

  // Countdown for AI decision animation
  useEffect(() => {
    if (step === 3 && countdown > 0) {
      const timer = setTimeout(() => setCountdown(prev => prev - 1), 1000);
      return () => clearTimeout(timer);
    }
    if (countdown === 0) setShowResults(true);
  }, [countdown, step]);

  const fadeClass = "transition-all duration-700 ease-out opacity-0 animate-fadeIn opacity-100";

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-950 text-slate-100 font-sans relative overflow-hidden">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900/80 backdrop-blur-lg border-b border-green-500/20">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-3">
          <div onClick={() => navigate("/FrontPage")} className="flex items-center space-x-3 cursor-pointer group">
            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-blue-500 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
              <TrendingUp className="w-6 h-6 text-white group-hover:rotate-12 transition-transform" />
            </div>
            <span className="text-2xl font-black group-hover:text-green-400 transition-colors">TrendTitan</span>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <button key={link.text} onClick={() => navigate(link.path)}
                className="px-4 py-1.5 rounded-full font-medium text-slate-200 hover:text-white hover:bg-green-500/20 transition-all duration-200">
                {link.text}
              </button>
            ))}
            <div className="flex items-center space-x-2 cursor-pointer group">
              <span className="text-green-400 font-semibold group-hover:text-white transition-colors">{userName}</span>
              <FaUserCircle className="text-3xl text-green-400 group-hover:text-white transition-colors" />
            </div>
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-green-400 focus:outline-none">
              {isOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden bg-gray-900/95 backdrop-blur-lg border-t border-green-500/20 flex flex-col items-start px-4 py-3 space-y-2">
            {navLinks.map((link) => (
              <button key={link.text} onClick={() => { navigate(link.path); setIsOpen(false); }}
                className="w-full px-4 py-2 rounded-lg text-slate-200 hover:text-white hover:bg-green-500/20 transition-all duration-200 text-left">
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

      <div className="pt-28 pb-10 flex justify-center relative z-10">
        <div className="w-full lg:w-[60%] xl:w-[50%] bg-gray-900/50 backdrop-blur-lg rounded-2xl border border-green-500/20 shadow-2xl p-8 space-y-6">

          {/* Step 0 */}
          {step === 0 && (
            <div className={`text-center ${fadeClass}`}>
              <h2 className="text-4xl font-black mb-4 text-green-400 animate-pulse">Pivot Planning Guide </h2>
              <p className="text-slate-400 mb-4">
                Pivot Points identify support & resistance levels.<br/>
                <FaArrowUp className="inline text-green-400" /> Bullish above Pivot, <FaArrowDown className="inline text-red-400" /> Bearish below Pivot.<br/>
                Example: High=120, Low=100, Close=110 → Pivot P=110
              </p>
              <button className="px-6 py-3 rounded-xl bg-green-500 hover:bg-green-600 text-white font-semibold"
                onClick={() => setStep(1)}>Next</button>
            </div>
          )}

          {/* Step 1 */}
          {step === 1 && (
            <div className={`space-y-4 ${fadeClass}`}>
              <h2 className="text-3xl font-bold mb-4 text-center">Enter High, Low & Close</h2>
              <input type="number" placeholder="High" value={high} onChange={(e) => setHigh(e.target.value)}
                className="w-full p-3 rounded-xl bg-gray-800 border border-green-400/40 focus:ring-2 focus:ring-green-400 outline-none"/>
              <input type="number" placeholder="Low" value={low} onChange={(e) => setLow(e.target.value)}
                className="w-full p-3 rounded-xl bg-gray-800 border border-green-400/40 focus:ring-2 focus:ring-green-400 outline-none"/>
              <input type="number" placeholder="Close" value={close} onChange={(e) => setClose(e.target.value)}
                className="w-full p-3 rounded-xl bg-gray-800 border border-green-400/40 focus:ring-2 focus:ring-green-400 outline-none"/>
              <div className="text-center mt-4">
                <button className="px-6 py-3 rounded-xl bg-green-500 hover:bg-green-600 text-white font-semibold"
                  onClick={() => setStep(2)}>Show Formula</button>
              </div>
            </div>
          )}

          {/* Step 2 */}
          {step === 2 && (
            <div className={`text-center ${fadeClass}`}>
              <h2 className="text-3xl font-bold mb-4 text-green-400 animate-pulse">Pivot Point Formula</h2>
              <p className="text-slate-400 mb-4">
                <FaCircle className="inline text-yellow-400" /> P = (High + Low + Close)/3<br/>
                R1 = 2P - Low, S1 = 2P - High<br/>
                R2 = P + (High - Low), S2 = P - (High - Low)<br/>
                R3 = High + 2(P - Low), S3 = Low - 2(High - P)
              </p>
              <div className="mt-4">
                <button className="px-6 py-3 rounded-xl bg-green-500 hover:bg-green-600 text-white font-semibold"
                  onClick={() => { calculatePivot(); setStep(3); setCountdown(5); setShowResults(false); }}>Calculate Results</button>
              </div>
            </div>
          )}

          {/* Step 3: Countdown */}
          {step === 3 && !showResults &&
            <div className="flex flex-col items-center justify-center space-y-4 h-60 animate-fade-in">
              <h2 className="text-6xl font-black text-green-400">{countdown}</h2>
              <div className="flex space-x-2">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className={`w-4 h-4 rounded-full bg-green-400 animate-ping delay-${i*200}`}></span>
                ))}
              </div>
              <p className="text-slate-400 mt-4">AI is calculating pivot levels...</p>
            </div>
          }

          {/* Step 3: Show Results */}
          {step === 3 && showResults && results &&
            <div className={`p-4 rounded-xl border border-green-500/20 bg-gray-800/50 transform transition-all duration-500 scale-95 hover:scale-100 ${fadeClass}`}>
              <h2 className="text-3xl font-bold mb-4 text-center text-green-400 animate-pulse">Pivot Results & Suggestions</h2>
              <div className="space-y-2">
                <p>Pivot Point (P): <FaCircle className="inline text-yellow-400" /> {results.P.toFixed(2)}</p>
                <p>Resistance Levels: <FaArrowUp className="inline text-green-400" /> R1: {results.R1.toFixed(2)}, R2: {results.R2.toFixed(2)}, R3: {results.R3.toFixed(2)}</p>
                <p>Support Levels: <FaArrowDown className="inline text-red-400" /> S1: {results.S1.toFixed(2)}, S2: {results.S2.toFixed(2)}, S3: {results.S3.toFixed(2)}</p>
              </div>
              <div className="mt-4 text-left text-slate-300 font-medium p-3 bg-gray-900/30 rounded-xl animate-pulse">
                <strong>Suggestion:</strong><br/>
                - Prices above P indicate bullish trend, consider long positions.<br/>
                - Prices below P indicate bearish trend, consider short positions.<br/>
                - R1-R3 are resistance zones; S1-S3 are support zones.<br/>
                - Combine with volume & market sentiment for best results.
              </div>
              <div className="mt-6 text-center">
                <button className="px-6 py-3 rounded-xl bg-green-500 hover:bg-green-600 text-white font-semibold" onClick={() => setStep(1)}>Back</button>
              </div>
            </div>
          }

        </div>
      </div>
    </div>
  );
}
