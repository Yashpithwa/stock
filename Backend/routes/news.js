import express from "express";
import NewsAPI from "newsapi";

const router = express.Router();
const newsapi = new NewsAPI("40668a228dc74a5d907f30e8f057b306");

router.get("/", async (req, res) => {
  const query = req.query.q || "stocks";

  try {
    const response = await newsapi.v2.everything({
      q: query,
      language: "en",
      sortBy: "publishedAt",
      pageSize: 10
    });

    res.json(response);
  } catch (error) {
    console.error("NewsAPI error:", error);
    res.status(500).json({ error: error.message });
  }
});

export default router;
