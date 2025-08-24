import React, { useState, useEffect } from "react";
import {
  PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, Tooltip, BarChart, Bar
} from "recharts";
import { useNavigate } from "react-router-dom";
import { TrendingUp, Menu, X } from "lucide-react";
import { FaUserCircle } from "react-icons/fa";

const riskProfiles = {
  low: { stocks: 30, gold: 30, silver: 20, realEstate: 15, crypto: 5 },
  medium: { stocks: 40, gold: 20, silver: 15, realEstate: 15, crypto: 10 },
  high: { stocks: 50, gold: 10, silver: 10, realEstate: 10, crypto: 20 },
};
const categories = ["stocks", "gold", "silver", "realEstate", "crypto"];
const colors = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#0088FE"];

export default function Invest() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [amount, setAmount] = useState(1000);
  const [risk, setRisk] = useState("medium");
  const [years, setYears] = useState(5);
  const [selectedCats, setSelectedCats] = useState(categories);
  const [isOpen, setIsOpen] = useState(false);

  const [countdown, setCountdown] = useState(5);
  const [showGraphs, setShowGraphs] = useState(false);

  const userName = "";
  const navLinks = [
    { text: "Prediction", path: "/FrontPage/StockPrediction" },
    { text: "News", path: "/FrontPage/News" },
    { text: "AI Assistant", path: "/FrontPage/Ai" },
    { text: "Invest Planning", path: "/FrontPage/Invest" },
    { text: "Pivot Planning Calculator", path: "/FrontPage/Pivot" },
  ];

  const getDistribution = () => {
    let dist = { ...riskProfiles[risk] };
    for (let cat of categories) if (!selectedCats.includes(cat)) delete dist[cat];
    const total = Object.values(dist).reduce((a, b) => a + b, 0);
    for (let cat in dist) dist[cat] = (dist[cat] / total) * 100;
    return dist;
  };

  const distribution = getDistribution();
  const investments = {};
  for (let cat in distribution) investments[cat] = ((distribution[cat]/100)*amount).toFixed(2);

  const pieData = Object.keys(investments).map(cat => ({ name: cat, value: Number(investments[cat]) }));
  const roiData = Array.from({length: years}, (_, i) => ({ year: i+1, value: amount*(1+0.08)**(i+1) }));
  const riskData = categories.map(cat => ({ name: cat, risk: riskProfiles[risk][cat] }));
  const investmentOverTime = Array.from({length: years}, (_, i) => {
    const data = { year: i+1 };
    for (let cat of selectedCats) data[cat] = (investments[cat] * (1+0.08)**(i+1)).toFixed(2);
    return data;
  });

  const generateSuggestion = () => {
    let suggestion = "AI Investment Suggestions:\n";
    if (!selectedCats.includes("stocks") && risk==="high") suggestion += "⚡ Add stocks for higher returns.\n";
    if (!selectedCats.includes("gold") && risk!=="low") suggestion += "🪙 Consider gold for stability.\n";
    if (selectedCats.includes("crypto") && risk==="low") suggestion += "⚠️ Crypto is volatile, reduce allocation.\n";
    if (selectedCats.includes("realEstate") && risk==="medium") suggestion += "🏠 Real Estate stabilizes growth.\n";
    suggestion += "✅ Diversification across multiple categories is recommended.";
    return suggestion;
  }

  // Countdown logic
  useEffect(() => {
    if (step===2 && countdown>0) {
      const timer = setTimeout(()=>setCountdown(prev=>prev-1), 1000);
      return ()=>clearTimeout(timer);
    }
    if (countdown===0) setShowGraphs(true);
  }, [countdown, step]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-950 text-slate-100 font-sans relative overflow-hidden">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900/80 backdrop-blur-lg border-b border-green-500/20">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-3">
          <div onClick={()=>navigate("/FrontPage")} className="flex items-center space-x-3 cursor-pointer group">
            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-blue-500 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
              <TrendingUp className="w-6 h-6 text-white group-hover:rotate-12 transition-transform"/>
            </div>
            <span className="text-2xl font-black group-hover:text-green-400 transition-colors">TrendTitan</span>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map(link=>(
              <button key={link.text} onClick={()=>navigate(link.path)}
                className="px-4 py-1.5 rounded-full font-medium text-slate-200 hover:text-white hover:bg-green-500/20 transition-all duration-200">{link.text}</button>
            ))}
            <div className="flex items-center space-x-2 cursor-pointer group">
              <span className="text-green-400 font-semibold group-hover:text-white transition-colors">{userName}</span>
              <FaUserCircle className="text-3xl text-green-400 group-hover:text-white transition-colors"/>
            </div>
          </div>
          <div className="md:hidden">
            <button onClick={()=>setIsOpen(!isOpen)} className="text-green-400 focus:outline-none">
              {isOpen ? <X className="w-7 h-7"/> : <Menu className="w-7 h-7"/>}
            </button>
          </div>
        </div>
      </nav>

      <section className="pt-28 pb-10 relative z-10 max-w-6xl mx-auto text-center space-y-8 transition-all duration-700">

        {/* Step 0 */}
        {step===0 &&
          <div className="bg-gray-900/60 backdrop-blur-sm p-10 rounded-2xl shadow-2xl border border-gray-800 animate-slide-in">
            <h2 className="text-4xl font-black mb-4 text-green-400 animate-pulse">Welcome to  AI Investment Planner </h2>
            <p className="text-slate-400 mb-6">Plan your investments with AI-powered insights.</p>
            <button onClick={()=>setStep(1)} className="px-6 py-3 rounded-xl bg-green-500 hover:bg-green-600 transition text-white font-semibold">Start</button>
          </div>
        }

        {/* Step 1: Input */}
        {step===1 &&
          <div className="bg-gray-900/60 backdrop-blur-sm p-10 rounded-2xl shadow-2xl border border-gray-800 text-left space-y-6 animate-slide-in">
            <h3 className="text-3xl font-bold mb-6 text-center">Enter Investment Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-slate-300">Amount($):</label>
                <input type="number" value={amount} onChange={e=>setAmount(Number(e.target.value))}
                  className="p-3 mt-1 w-full rounded-xl bg-gray-800 border border-green-400/40 focus:ring-2 focus:ring-green-400 outline-none"/>
              </div>
              <div>
                <label className="block text-slate-300">Risk Profile:</label>
                <select value={risk} onChange={e=>setRisk(e.target.value)}
                  className="p-3 mt-1 w-full rounded-xl bg-gray-800 border border-green-400/40 focus:ring-2 focus:ring-green-400 outline-none">
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
              <div>
                <label className="block text-slate-300">Years:</label>
                <input type="number" value={years} onChange={e=>setYears(Number(e.target.value))}
                  className="p-3 mt-1 w-full rounded-xl bg-gray-800 border border-green-400/40 focus:ring-2 focus:ring-green-400 outline-none"/>
              </div>
              <div>
                <label className="block text-slate-300 mb-2">Categories:</label>
                <div className="flex flex-wrap gap-4">
                  {categories.map(cat=>(
                    <label key={cat} className="flex items-center space-x-2 text-slate-300">
                      <input type="checkbox" checked={selectedCats.includes(cat)} onChange={()=>
                        setSelectedCats(prev=>prev.includes(cat)?prev.filter(c=>c!==cat):[...prev,cat])
                      } className="accent-green-500"/>
                      <span>{cat}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-6 text-center">
              <button onClick={()=>{setStep(2); setCountdown(5); setShowGraphs(false)}} className="px-6 py-3 rounded-xl bg-green-500 hover:bg-green-600 transition text-white font-semibold">See Results</button>
            </div>
          </div>
        }

        {/* Step 2: Countdown */}
        {step===2 && !showGraphs &&
          <div className="flex flex-col items-center justify-center space-y-4 h-96 animate-fade-in">
            <h2 className="text-6xl font-black text-green-400">{countdown}</h2>
            <div className="flex space-x-2">
              {[...Array(5)].map((_,i)=>(
                <span key={i} className={`w-4 h-4 rounded-full bg-green-400 animate-ping delay-${i*200}`}></span>
              ))}
            </div>
            <p className="text-slate-400 mt-4">Waiting for AI decision...</p>
          </div>
        }

        {/* Step 2: Show Graphs */}
        {step===2 && showGraphs &&
          <div className="space-y-8 animate-slide-in">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

              {/* Pie Chart */}
              <div className="bg-gray-800/70 p-4 rounded-xl shadow-2xl hover:scale-105 transform transition-all">
                <h4 className="text-lg font-semibold mb-2 text-green-400">Allocation (Pie Chart)</h4>
                <PieChart width={300} height={300}>
                  <Pie data={pieData} dataKey="value" nameKey="name" outerRadius={100} isAnimationActive>
                    {pieData.map((_, i)=><Cell key={i} fill={colors[i%5]}/>)}
                  </Pie>
                  <Tooltip/>
                </PieChart>
              </div>

              {/* ROI Line Chart */}
              <div className="bg-gray-800/70 p-4 rounded-xl shadow-2xl hover:scale-105 transform transition-all">
                <h4 className="text-lg font-semibold mb-2 text-green-400">ROI Growth</h4>
                <LineChart width={400} height={300} data={roiData}>
                  <XAxis dataKey="year"/>
                  <YAxis/>
                  <Tooltip/>
                  <Line type="monotone" dataKey="value" stroke="url(#colorUv)" strokeWidth={3} dot={{r:4}} activeDot={{r:6}}/>
                  <defs>
                    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#00c6ff" stopOpacity={1}/>
                      <stop offset="100%" stopColor="#0072ff" stopOpacity={1}/>
                    </linearGradient>
                  </defs>
                </LineChart>
              </div>

            </div>

            {/* Risk Bar Chart */}
            <div className="bg-gray-800/70 p-4 rounded-xl shadow-2xl hover:scale-105 transform transition-all">
              <h4 className="text-lg font-semibold mb-2 text-green-400">Risk vs Category</h4>
              <BarChart width={600} height={250} data={riskData}>
                <XAxis dataKey="name"/>
                <YAxis/>
                <Tooltip/>
                <Bar dataKey="risk" fill="#82ca9d" animationDuration={1500}/>
              </BarChart>
            </div>

            {/* Investment Over Time */}
            <div className="bg-gray-800/70 p-4 rounded-xl shadow-2xl hover:scale-105 transform transition-all">
              <h4 className="text-lg font-semibold mb-2 text-green-400">Investment Over Time</h4>
              <LineChart width={600} height={300} data={investmentOverTime}>
                <XAxis dataKey="year"/>
                <YAxis/>
                <Tooltip/>
                {selectedCats.map((cat,i)=>(
                  <Line key={cat} type="monotone" dataKey={cat} stroke={colors[i%5]} strokeWidth={3} dot={{r:3}} activeDot={{r:6}}/>
                ))}
              </LineChart>
            </div>

            <div className="mt-4 text-left bg-gray-800/50 p-4 rounded-xl shadow-lg font-medium whitespace-pre-line animate-pulse">
              {generateSuggestion()}
            </div>

            <div className="mt-6 text-center">
              <button onClick={()=>setStep(1)} className="px-6 py-3 rounded-xl bg-green-500 hover:bg-green-600 transition text-white font-semibold">Back</button>
            </div>
          </div>
        }

      </section>
    </div>
  );
}
