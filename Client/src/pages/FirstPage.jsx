import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  TrendingUp, Bot, BarChart3, ShieldCheck, Calculator, Brain,
  Twitter, Linkedin, Github, Mail, Phone, Menu, X
} from "lucide-react";
import { FaUserCircle } from "react-icons/fa";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts';

// Mock data for chart preview
const stockData = [
  { name: 'Jan', value: 4000, prediction: 4200 },
  { name: 'Feb', value: 3000, prediction: 3800 },
  { name: 'Mar', value: 2000, prediction: 2900 },
  { name: 'Apr', value: 2780, prediction: 3200 },
  { name: 'May', value: 1890, prediction: 2100 },
  { name: 'Jun', value: 2390, prediction: 2800 },
  { name: 'Jul', value: 3490, prediction: 4000 },
];

export default function FirstPage() {
  const navigate = useNavigate();
  const [theme, setTheme] = useState('dark');
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { text: "Home", path: "/" },
    { text: "Features", path: "/#features" },
    { text: "Reviews", path: "/#reviews" },
    { text: "Pricing", path: "/pricing" },
    { text: "Invest", path: "/invest" },
  ];

  const userName = "";

  useEffect(() => {
    if (theme === 'dark') document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [theme]);

  useEffect(() => {
    const handleMouseMove = (e) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');

  const testimonials = [
    { name: "Sarah J.", role: "Day Trader", quote: "TrendTitan's AI predictions are a game-changer.", initials: "SJ", color: "bg-pink-500", profit: "+340%" },
    { name: "Michael B.", role: "Long-term Investor", quote: "The comparative analysis tools are incredible.", initials: "MB", color: "bg-blue-500", profit: "+180%" },
    { name: "Alex C.", role: "Financial Advisor", quote: "I recommend TrendTitan to all my clients.", initials: "AC", color: "bg-green-500", profit: "+275%" },
    { name: "Emily R.", role: "Crypto Enthusiast", quote: "Finally, a platform that understands crypto volatility.", initials: "ER", color: "bg-yellow-500", profit: "+410%" },
    { name: "James K.", role: "Hedge Fund Manager", quote: "The AI-driven risk shield saved us millions.", initials: "JK", color: "bg-red-500", profit: "+220%" },
    { name: "Nina P.", role: "Beginner Trader", quote: "So easy to use, I started making smarter trades instantly.", initials: "NP", color: "bg-purple-500", profit: "+95%" },
  ];

  return (
    <div className="bg-gradient-to-br from-white via-blue-50/30 to-cyan-50/50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800 text-slate-700 dark:text-slate-200 min-h-screen overflow-x-hidden ">
      
      {/* Cursor Glow */}
      <div 
        className="fixed pointer-events-none z-[100] w-8 h-8 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full opacity-30 blur-lg transition-all duration-100 ease-out"
        style={{ left: mousePos.x - 16, top: mousePos.y - 16 }}
      />

      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-lg border-b border-green-500/20">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-3">
          <div onClick={() => navigate("/login")} className="flex items-center space-x-3 cursor-pointer group">
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
                  onClick={() => navigate("/login")}
                  className="px-4 py-1.5 rounded-full font-medium text-slate-200 hover:text-white hover:bg-green-500/20 transition-all duration-200"
                >
                  {link.text}
                </button>
              ))}
            </div>

            {/* User Info */}
            <div className="flex items-center space-x-2 cursor-pointer group" onClick={() => navigate("/login")}>
              <span className="text-green-400 font-semibold group-hover:text-white transition-colors"></span>
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
                onClick={() => { navigate("/login"); setIsOpen(false); }}
                className="w-full px-4 py-2 rounded-lg text-slate-200 hover:text-white hover:bg-green-500/20 transition-all duration-200 text-left"
              >
                {link.text}
              </button>
            ))}
            <div className="flex items-center space-x-2 mt-4" onClick={() => navigate("/login")}>
              <span className="text-green-400 font-semibold">{userName}</span>
              <FaUserCircle className="text-3xl text-green-400" />
            </div>
          </div>
        )}
      </nav>

      <main className="pt-24">
        {/* Hero Section */}
        <section className="text-center py-24 px-4">
          <h1 className="text-6xl md:text-7xl font-black text-slate-900 dark:text-white mb-6 tracking-tight">
            Trade <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">Smarter</span>, Not Harder
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-600 dark:text-slate-400 mb-8">
            AI-powered predictions, real-time analytics, and risk protection — all in one platform.
          </p>
          <div className="flex justify-center gap-4">
            <button onClick={() => navigate('/login')} className="px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-400 text-white font-semibold rounded-lg shadow-lg hover:scale-105 transition">Start Free Trial</button>
            <button onClick={() => navigate('/login')} className="px-6 py-3 bg-slate-200 dark:bg-slate-800 font-semibold rounded-lg hover:scale-105 transition">Watch Demo</button>
          </div>

          {/* Chart Preview */}
          <div className="mt-16 max-w-4xl mx-auto bg-white/80 dark:bg-slate-900/50 backdrop-blur-sm rounded-2xl shadow-lg p-6 cursor-pointer" onClick={() => navigate("/login")}>
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
              <FeatureCard onClick={() => navigate('/login')} icon={TrendingUp} title="AI Predictions" description="90.2% accurate predictions that see the future before it happens." iconColor="text-green-500" iconBg="bg-green-500/10" />
              <FeatureCard onClick={() => navigate('/login')} icon={Bot} title="Smart Assistant" description="Your personal trading genius available 24/7." iconColor="text-purple-500" iconBg="bg-purple-500/10" />
              <FeatureCard onClick={() => navigate('/login')} icon={BarChart3} title="Live Analytics" description="Real-time market analysis with interactive charts." iconColor="text-blue-500" iconBg="bg-blue-500/10" />
              <FeatureCard onClick={() => navigate('/login')} icon={ShieldCheck} title="Risk Shield" description="Advanced risk management that protects your portfolio." iconColor="text-cyan-500" iconBg="bg-cyan-500/10" />
              <FeatureCard onClick={() => navigate('/login')} icon={Calculator} title="Pivot Calculator" description="Quickly calculate pivot points, support, and resistance levels." iconColor="text-yellow-500" iconBg="bg-yellow-500/10" />
              <FeatureCard onClick={() => navigate('/login')} icon={Brain} title="AI Investment" description="Let AI allocate and balance your investments." iconColor="text-pink-500" iconBg="bg-pink-500/10" />
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="reviews" className="py-24 px-4 bg-gradient-to-b from-cyan-50/20 via-slate-50 to-white dark:from-slate-950 dark:via-slate-900/90 dark:to-slate-800">
          <div className="max-w-7xl mx-auto text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-black text-slate-900 dark:text-white mb-6 tracking-tighter">
              Users are <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">Crushing It</span>
            </h2>
            <p className="max-w-3xl mx-auto text-xl text-slate-600 dark:text-slate-400 font-medium">
              Hear what traders and investors say about TrendTitan.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-lg flex flex-col justify-between hover:-translate-y-2 transition-transform cursor-pointer" onClick={() => navigate("/login")}>
                <p className="text-slate-700 dark:text-slate-300 font-medium mb-6">"{t.quote}"</p>
                <div className="flex items-center space-x-4">
                  <div className={`${t.color} w-12 h-12 rounded-full flex items-center justify-center text-white font-bold`}>{t.initials}</div>
                  <div>
                    <p className="font-bold text-slate-900 dark:text-white">{t.name}</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">{t.role}</p>
                  </div>
                  <div className="ml-auto font-bold text-green-500">{t.profit}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white relative mt-16">
          <div className="max-w-7xl mx-auto px-4 py-16">
            <div className="grid md:grid-cols-5 gap-12 mb-12">
              <div className="md:col-span-2 cursor-pointer" onClick={() => navigate("/login")}>
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-xl flex items-center justify-center shadow-lg">
                    <TrendingUp className="w-7 h-7 text-white" />
                  </div>
                  <span className="text-3xl font-black text-white">TrendTitan</span>
                </div>
                <p className="text-slate-300 text-lg leading-relaxed mb-6 max-w-md">
                  Empowering traders worldwide with AI-driven insights and predictive analytics.
                </p>
                <div className="flex space-x-4">
                  <SocialLink icon={Twitter} />
                  <SocialLink icon={Linkedin} />
                  <SocialLink icon={Github} />
                  <SocialLink icon={Mail} />
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-white mb-6">Platform</h3>
                <FooterLink text="Dashboard" />
                <FooterLink text="AI Predictions" />
                <FooterLink text="Analytics" />
                <FooterLink text="Risk Management" />
              </div>

              <div>
                <h3 className="text-xl font-bold text-white mb-6">Resources</h3>
                <FooterLink text="Blog" />
                <FooterLink text="Tutorials" />
                <FooterLink text="Pricing" />
                <FooterLink text="Careers" />
              </div>

              <div>
                <h3 className="text-xl font-bold text-white mb-6">Support</h3>
                <FooterLink text="Help Center" />
                <FooterLink text="API Docs" />
                <FooterLink text="Community" />
                <FooterLink text="Contact Us" />
                <div className="pt-4 border-t border-slate-700 mt-4">
                  <div className="flex items-center text-slate-300 mb-2">
                    <Mail className="w-4 h-4 mr-2" />
                    <span className="text-sm">support@trendtitan.ai</span>
                  </div>
                  <div className="flex items-center text-slate-300">
                    <Phone className="w-4 h-4 mr-2" />
                    <span className="text-sm">+1 (555) 123-4567</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-slate-700 pt-8 flex flex-col md:flex-row justify-between items-center">
              <p className="text-slate-400 text-sm mb-4 md:mb-0">© 2024 TrendTitan. All rights reserved.</p>
              <div className="flex space-x-6 text-sm">
                <FooterLink text="Privacy Policy" />
                <FooterLink text="Terms of Service" />
                <FooterLink text="Cookie Policy" />
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}

// Helper Components
function FeatureCard({ icon: Icon, title, description, iconColor, iconBg, onClick }) {
  return (
    <div onClick={onClick} className="bg-white/80 dark:bg-slate-900/50 p-6 rounded-2xl shadow-lg border border-slate-200/50 dark:border-slate-800 hover:-translate-y-2 transition-transform cursor-pointer">
      <div className={`w-12 h-12 flex items-center justify-center rounded-xl mb-4 ${iconBg}`}>
        <Icon className={`w-6 h-6 ${iconColor}`} />
      </div>
      <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{title}</h4>
      <p className="text-sm text-slate-500 dark:text-slate-400">{description}</p>
    </div>
  );
}

function SocialLink({ icon: Icon }) {
  const navigate = useNavigate();
  return (
    <button onClick={() => navigate("/login")} className="w-10 h-10 bg-slate-800 hover:bg-gradient-to-r hover:from-blue-500 hover:to-cyan-400 rounded-lg flex items-center justify-center transition-colors">
      <Icon className="w-5 h-5 text-white" />
    </button>
  );
}

function FooterLink({ text }) {
  const navigate = useNavigate();
  return (
    <button onClick={() => navigate("/login")} className="block text-slate-400 hover:text-white mb-3 transition-colors">
      {text}
    </button>
  );
}
