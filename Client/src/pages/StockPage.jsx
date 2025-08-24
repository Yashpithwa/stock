import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  LineChart,
  Line,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { TrendingUp, TrendingDown } from "lucide-react";

const StockPage = () => {
  const { symbol } = useParams();
  const [stockData, setStockData] = useState([]);
  const [days, setDays] = useState(30);
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(true);
  const [predicting, setPredicting] = useState(false);

  useEffect(() => {
    const fetchStockData = async () => {
      setLoading(true);
      try {
        const res = await fetch(`http://localhost:5000/api/stocks/${symbol}?days=${days}`);
        if (!res.ok) throw new Error("Failed to fetch stock data");
        const data = await res.json();
        setStockData(data);
      } catch (err) {
        console.error(err);
        setStockData([]);
      }
      setLoading(false);
    };
    fetchStockData();
  }, [symbol, days]);

  const handlePredict = async () => {
    if (!stockData.length) return alert("No stock data available.");
    setPredicting(true);
    try {
      const res = await fetch(`http://localhost:5000/api/predict/${symbol}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ symbol, days, closePrices: stockData.map(s => s.close) }),
      });
      const data = await res.json();
      if (data.predicted_next_close !== undefined) setPrediction(data.predicted_next_close);
      else alert("Prediction failed");
    } catch (err) {
      console.error(err);
      alert("Network error");
    }
    setPredicting(false);
  };

  const lastClose = stockData.length ? stockData[stockData.length - 1].close : null;
  const shouldBuy = lastClose !== null && prediction !== null ? prediction > lastClose : null;

  const chartData = prediction !== null ? [...stockData, { close: prediction }] : stockData;

  return (
    <div className="p-6 min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-950 text-white">
      <h1 className="text-3xl font-bold text-green-400">{symbol} Stock Data</h1>

      {/* Controls */}
      <div className="mt-6 flex flex-col md:flex-row gap-4 items-start md:items-center">
        <select
          value={days}
          onChange={(e) => setDays(Number(e.target.value))}
          className="px-3 py-2 rounded-lg bg-gray-800 border border-green-400 text-white focus:outline-none"
        >
          <option value={30}>30 days</option>
          <option value={60}>60 days</option>
          <option value={90}>90 days</option>
        </select>
        <button
          onClick={handlePredict}
          disabled={predicting || loading}
          className={`px-5 py-2 rounded-lg font-semibold transition ${
            predicting || loading ? "bg-gray-700 cursor-not-allowed" : "bg-green-500 hover:bg-green-600"
          }`}
        >
          {predicting ? "Predicting..." : "Predict"}
        </button>
      </div>

      {/* Chart */}
      <div className="mt-6 h-96 w-full bg-gray-900/50 rounded-2xl p-4 shadow-xl border border-green-500/40">
        {loading ? (
          <div className="flex justify-center items-center h-full">
            <div className="loader border-t-4 border-green-400 rounded-full w-12 h-12 animate-spin"></div>
            <span className="ml-4 text-green-400 font-semibold">Loading stock data...</span>
          </div>
        ) : chartData.length ? (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <defs>
                <linearGradient id="aiGradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#4ade80" stopOpacity={0.6} />
                  <stop offset="50%" stopColor="#22d3ee" stopOpacity={0.9} />
                  <stop offset="100%" stopColor="#facc15" stopOpacity={0.7} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="#2c2c2c" strokeDasharray="8 4" />
              <YAxis stroke="#ccc" domain={["auto", "auto"]} />
              <Tooltip contentStyle={{ backgroundColor: "#111", border: "none", color: "#fff" }} />
              <Line
                type="monotone"
                dataKey="close"
                stroke="url(#aiGradient)"
                strokeWidth={3}
                dot={(props) => {
                  const { cx, cy, index } = props;
                  const isPrediction = index === chartData.length - 1 && prediction !== null;
                  return (
                    <circle
                      cx={cx}
                      cy={cy}
                      r={isPrediction ? 10 : 4}
                      fill={isPrediction ? "#facc15" : "#22d3ee"}
                      className={isPrediction ? "animate-pulse drop-shadow-[0_0_8px_#facc15]" : "drop-shadow-[0_0_4px_#22d3ee]"}
                    />
                  );
                }}
                strokeDasharray="12 6"
                isAnimationActive={true}
                animationDuration={2000}
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div className="text-green-400 font-semibold">No data available for {symbol}</div>
        )}
      </div>

      {/* Prediction Result */}
      {shouldBuy !== null && (
        <div
          className={`mt-6 p-5 rounded-2xl text-lg flex items-center gap-3 shadow-lg ${
            shouldBuy ? "bg-green-800/80 border border-green-500" : "bg-yellow-800/80 border border-yellow-500"
          }`}
        >
          {shouldBuy ? (
            <TrendingUp className="w-6 h-6 text-green-300" />
          ) : (
            <TrendingDown className="w-6 h-6 text-yellow-300" />
          )}
          <div>
            Predicted next close price for{" "}
            <span className="font-bold text-green-300">{symbol}</span> ({days} days window):{" "}
            <strong>${prediction.toFixed(2)}</strong>
            <div className="mt-1">
              {shouldBuy ? (
                <span className="text-green-300 font-semibold">✅ Right time to BUY</span>
              ) : (
                <span className="text-yellow-300 font-semibold">⚖️ Better to HOLD</span>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StockPage;
