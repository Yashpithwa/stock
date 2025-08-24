import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, Legend,
  ResponsiveContainer, CartesianGrid, Area, AreaChart
} from "recharts";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

// Allowed stocks

const allowedStocks = [
  "AAPL","GOOGL","MSFT","TSLA","AMZN","NVDA","META","NFLX","AMD","INTC",
  "ORCL","IBM","ADBE","PYPL","SHOP","BABA","V","MA","DIS","CSCO",
  "CRM","ACN","QCOM","TXN","COST","WMT","NKE","SBUX","ADP","LIN",
  "HON","GE","UPS","CAT","MMM"
];

// Button component
const Button = ({ children, onClick, active }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 rounded-lg border transition font-semibold ${
      active
        ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md"
        : "bg-white text-gray-700 hover:bg-gray-100"
    }`}
  >
    {children}
  </button>
);

// Card component
const Card = ({ children }) => (
  <div className="bg-white shadow-xl rounded-2xl p-6">{children}</div>
);

// Color palette
const colors = [
  "#FF5733","#33FF57","#3357FF","#FF33A1","#33FFF6",
  "#FFC133","#8E44AD","#2ECC71","#E74C3C","#3498DB"
];

const CompareStocks = () => {
  const [selectedStocks, setSelectedStocks] = useState([]);
  const [days, setDays] = useState(30);
  const [stockData, setStockData] = useState({});
  const [chartType, setChartType] = useState("line"); // line | area
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    if (selectedStocks.length === 0) return;
    try {
      setLoading(true);
      const symbols = selectedStocks.join(",");
      const res = await axios.get(
        `http://localhost:5000/api/compare/multi/${symbols}?days=${days}`
      );
      setStockData(res.data);
    } catch (err) {
      console.error("Fetch Error:", err);
      setStockData({});
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [selectedStocks, days]);

  const handleSelectStock = (symbol) => {
    if (selectedStocks.includes(symbol)) {
      setSelectedStocks(selectedStocks.filter((s) => s !== symbol));
    } else if (selectedStocks.length < 3) {
      setSelectedStocks([...selectedStocks, symbol]);
    } else {
      alert("⚠️ You can select only 3 stocks!");
    }
  };

  const downloadPDF = async () => {
    const chartArea = document.getElementById("chart-container");
    const canvas = await html2canvas(chartArea);
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("landscape");
    pdf.addImage(imgData, "PNG", 10, 10, 280, 150);
    pdf.save("CompareStocks.pdf");
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">📊 Compare Stocks</h1>

      {/* Stock selection */}
      <div className="flex flex-wrap gap-2 mb-4">
        {allowedStocks.map((stock) => (
          <Button
            key={stock}
            active={selectedStocks.includes(stock)}
            onClick={() => handleSelectStock(stock)}
          >
            {stock}
          </Button>
        ))}
      </div>

      {/* Controls */}
      <div className="flex gap-4 mb-6">
        {[30, 60, 90].map((d) => (
          <Button key={d} active={days === d} onClick={() => setDays(d)}>
            Last {d} Days
          </Button>
        ))}
        <Button active={chartType === "line"} onClick={() => setChartType("line")}>
          📈 Line
        </Button>
        <Button active={chartType === "area"} onClick={() => setChartType("area")}>
          🌊 Area
        </Button>
      </div>

      {/* Chart */}
      <Card>
        <div id="chart-container" className="w-full h-[500px] flex items-center justify-center">
          {loading ? (
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-500"></div>
          ) : Object.keys(stockData).length === 0 ? (
            <p className="text-gray-500">Select stocks to view chart</p>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              {chartType === "line" ? (
                <LineChart>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ddd" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  {Object.keys(stockData).map((symbol, i) => (
                    <Line
                      key={symbol}
                      type="monotone"
                      dataKey="close"
                      data={stockData[symbol]}
                      name={symbol}
                      stroke={colors[i % colors.length]}
                      strokeWidth={3}
                      dot={false}
                      activeDot={{ r: 6 }}
                    />
                  ))}
                </LineChart>
              ) : (
                <AreaChart>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ddd" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  {Object.keys(stockData).map((symbol, i) => (
                    <Area
                      key={symbol}
                      type="monotone"
                      dataKey="close"
                      data={stockData[symbol]}
                      name={symbol}
                      stroke={colors[i % colors.length]}
                      fill={colors[i % colors.length]}
                      fillOpacity={0.3}
                    />
                  ))}
                </AreaChart>
              )}
            </ResponsiveContainer>
          )}
        </div>
        <div className="mt-4">
          <Button onClick={downloadPDF} active={true}>
            📥 Download PDF
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default CompareStocks;
