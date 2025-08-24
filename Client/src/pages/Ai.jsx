import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { TrendingUp, Send, Menu, X } from "lucide-react";

export default function Ai() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const messagesEndRef = useRef(null);
  const navigate = useNavigate();
  const userName = "";

  const navLinks = [
    { text: "Prediction", path: "/FrontPage/StockPrediction" },
    { text: "News", path: "/FrontPage/News" },
    { text: "AI Assistant", path: "/FrontPage/Ai" },
    { text: "Invest Planning", path: "/FrontPage/Invest" },
    { text: "Pivot Planning Calculator", path: "/FrontPage/Pivot" },
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);

    try {
      const res = await fetch("/api/assistant", { // proxy will handle port 5000
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: input }),
      });

      const data = await res.json();
      const assistantText = data?.text || "No response";
      setMessages((prev) => [...prev, { sender: "assistant", text: assistantText }]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        { sender: "assistant", text: "⚠️ Failed to get response." },
      ]);
    } finally {
      setLoading(false);
      setInput("");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-slate-100 font-sans overflow-hidden">

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
          <div onClick={() => navigate("/FrontPage")} className="flex items-center space-x-3 cursor-pointer group">
            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-blue-500 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
              <TrendingUp className="w-6 h-6 text-white group-hover:rotate-12 transition-transform" />
            </div>
            <span className="text-2xl font-black group-hover:text-green-400 transition-colors">TrendTitan</span>
          </div>

          {/* Desktop */}
          <div className="hidden md:flex items-center justify-between w-full ml-10">
            <div className="flex items-center space-x-6">
              {navLinks.map(link => (
                <button key={link.text} onClick={() => navigate(link.path)}
                  className="px-4 py-1.5 rounded-full font-medium text-slate-200 hover:text-white hover:bg-green-500/20 transition-all duration-200">
                  {link.text}
                </button>
              ))}
            </div>
            <div className="flex items-center space-x-2 cursor-pointer group">
              <span className="text-green-400 font-semibold group-hover:text-white transition-colors">{userName}</span>
              <FaUserCircle className="text-3xl text-green-400 group-hover:text-white transition-colors" />
            </div>
          </div>

          {/* Mobile */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-green-400 focus:outline-none">
              {isOpen ? <X className="w-7 h-7"/> : <Menu className="w-7 h-7"/>}
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden bg-slate-950/95 backdrop-blur-lg border-t border-green-500/20 flex flex-col items-start px-4 py-3 space-y-2 z-50">
            {navLinks.map(link => (
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

      {/* Chat */}
      <div className="flex-1 pt-24 pb-20 flex justify-center relative z-10">
        <div className="w-full lg:w-[60%] xl:w-[50%] bg-slate-900/50 backdrop-blur-lg rounded-2xl border border-green-500/20 shadow-lg flex flex-col">
          <main className="flex-1 p-6 overflow-y-auto space-y-4 rounded-t-2xl">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`px-4 py-2 rounded-2xl max-w-[70%] shadow-md transition-transform ${msg.sender === "user"
                  ? "bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-br-none"
                  : "bg-slate-800 text-slate-100 rounded-bl-none"}`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {loading && <div className="text-sm text-slate-400 animate-pulse">AI is typing...</div>}
            <div ref={messagesEndRef} />
          </main>

          <footer className="p-4 flex gap-2 bg-slate-900/80 border-t border-green-500/20 rounded-b-2xl">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your message..."
              rows={1}
              className="flex-1 p-3 rounded-xl border border-slate-700 bg-slate-800 text-slate-100 focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
            />
            <button onClick={sendMessage} disabled={loading} 
              className="p-3 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-xl hover:scale-105 transition flex items-center justify-center shadow-md disabled:opacity-50">
              <Send size={18} />
            </button>
          </footer>
        </div>
      </div>
    </div>
  );
}
