import express from "express";
import mongoose from "mongoose";

const router = express.Router();

// Watchlist Schema
const watchlistSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  symbol: { type: String, required: true },
});

const Watchlist = mongoose.model("Watchlist", watchlistSchema);

// Add stock to watchlist
router.post("/watchlist", async (req, res) => {
  const { userId, symbol } = req.body;
  if (!userId || !symbol) {
    return res.status(400).json({ message: "Missing userId or symbol" });
  }

  try {
    const exists = await Watchlist.findOne({ userId, symbol });
    if (exists) {
      return res.status(400).json({ message: "Stock already in watchlist" });
    }

    const stock = new Watchlist({ userId, symbol });
    await stock.save();
    res.status(201).json({ message: "Added to watchlist" });
  } catch (error) {
    console.error("Add to watchlist error:", error);
    res.status(500).json({ error: error.message });
  }
});

// Remove stock from watchlist
router.delete("/watchlist/:userId/:symbol", async (req, res) => {
  const { userId, symbol } = req.params;
  if (!userId || !symbol) {
    return res.status(400).json({ message: "Missing userId or symbol" });
  }

  try {
    const deleted = await Watchlist.findOneAndDelete({ userId, symbol });
    if (!deleted) {
      return res.status(404).json({ message: "Stock not found in watchlist" });
    }
    res.json({ message: "Removed from watchlist" });
  } catch (error) {
    console.error("Remove from watchlist error:", error);
    res.status(500).json({ error: error.message });
  }
});

// Get user watchlist
router.get("/watchlist/:userId", async (req, res) => {
  const { userId } = req.params;
  if (!userId) {
    return res.status(400).json({ message: "Missing userId" });
  }

  try {
    const stocks = await Watchlist.find({ userId }).select("symbol -_id");
    res.json({ stocks: stocks.map((s) => s.symbol) });
  } catch (error) {
    console.error("Fetch watchlist error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
