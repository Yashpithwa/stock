// routes/StockPrice.js
import express from "express";
import yahooFinance from "yahoo-finance2";

const router = express.Router();

router.get("/api/price/:symbol", async (req, res) => {
  try {
    const symbol = req.params.symbol.toUpperCase();
    const days = 2; // at least 2 days needed to compare today vs yesterday

    const result = await yahooFinance.historical(symbol, {
      period1: new Date(Date.now() - days * 24 * 60 * 60 * 1000),
      period2: new Date(),
    });

    if (!result || result.length < 2) {
      return res.status(404).json({ error: `Not enough data for ${symbol}` });
    }

    const todayClose = result[result.length - 1].close;
    const prevClose = result[result.length - 2].close;
    const priceDiff = todayClose - prevClose;

    res.json({
      symbol,
      price: todayClose,
      difference: priceDiff,
    });
  } catch (error) {
    console.error("Error fetching stock price:", error);
    res.status(500).json({ error: "Internal server error", details: error.message });
  }
});

export default router;
