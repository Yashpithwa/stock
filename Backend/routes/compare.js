import express from "express";
import yahooFinance from "yahoo-finance2";

const router = express.Router();

/**
 * Compare multiple stocks for given days (30, 60, 90)
 * API: /api/compare-stocks?stocks=AAPL,GOOGL,MSFT&days=60
 */
router.get("/", async (req, res) => {
  try {
    const { stocks, days } = req.query;

    if (!stocks) {
      return res.status(400).json({ error: "Stocks required" });
    }

    const stockList = stocks.split(",");
    const period = days || 30;

    let mergedData = {};

    for (let stock of stockList) {
      const history = await yahooFinance.chart(stock, { interval: "1d", range: `${period}d` });

      history.quotes.forEach((item) => {
        const date = item.date.toISOString().slice(0, 10);
        if (!mergedData[date]) mergedData[date] = { date };

        mergedData[date][stock] = item.close; // 👈 sirf close price use for graph
        mergedData[`${stock}_open`] = item.open;
        mergedData[`${stock}_high`] = item.high;
        mergedData[`${stock}_low`] = item.low;
        mergedData[`${stock}_volume`] = item.volume;
      });
    }

    const finalData = Object.values(mergedData);
    res.json(finalData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong" });
  }
});

export default router;
