import express from "express";
import yahooFinance from "yahoo-finance2";
import Stock from "../models/Stock.js";
import axios from "axios";

const router = express.Router();

// ---------------------------
// Allowed Stocks (250+)
// ---------------------------
const allowedStocks = [
  "AAPL","GOOGL","MSFT","TSLA","AMZN","NVDA","META","NFLX","AMD","INTC",
  "ORCL","IBM","ADBE","PYPL","SHOP","BABA","V","MA","DIS","CSCO",
  "CRM","ACN","QCOM","TXN","COST","WMT","NKE","SBUX","ADP","LIN",
  "HON","GE","UPS","CAT","MMM"
];

// Get historical stock data
// ---------------------------
router.get("/api/stocks/:symbol", async (req, res) => {
  try {
    const symbol = req.params.symbol.toUpperCase();
    const days = parseInt(req.query.days) || 30;

    if (!allowedStocks.includes(symbol)) {
      return res.status(400).json({ error: "Invalid stock symbol" });
    }

    const result = await yahooFinance.historical(symbol, {
      period1: new Date(Date.now() - days * 24 * 60 * 60 * 1000),
      period2: new Date(),
    });

    const formatted = result.map((item) => ({
      symbol,
      date: item.date.toISOString(),
      close: item.close,
    }));

    if (formatted.length) {
      const bulkOps = formatted.map((stock) => ({
        updateOne: {
          filter: { symbol: stock.symbol, date: stock.date },
          update: { $set: stock },
          upsert: true,
        },
      }));
      await Stock.bulkWrite(bulkOps);
    }

    res.json(formatted);
  } catch (err) {
    console.error("API Error:", err.stack);
    res.status(500).json({ error: "Error fetching stock data" });
  }
});

// ---------------------------
// Predict using Python LSTM API
// ---------------------------
router.post("/api/predict/:symbol", async (req, res) => {
  try {
    const symbol = req.params.symbol.toUpperCase();
    const { days, closePrices } = req.body;

    if (!allowedStocks.includes(symbol)) {
      return res.status(400).json({ error: "Invalid stock symbol" });
    }

    if (!closePrices || !closePrices.length) {
      return res.status(400).json({ error: "No close prices provided" });
    }

    const response = await axios.post("http://localhost:8000/predict", {
      symbol,
      days,
      closePrices,
    });

    if (response.data && response.data.predicted_next_close !== undefined) {
      res.json(response.data);
    } else {
      res.status(500).json({ error: "Python API did not return prediction" });
    }
  } catch (err) {
    console.error("Prediction Error:", err.response?.data || err.message, err.stack);
    res.status(500).json({ error: "Prediction request failed" });
  }
});

export default router;
