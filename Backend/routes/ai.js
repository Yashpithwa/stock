// ai.js
import express from "express";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const router = express.Router();

router.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const stockAIPrompt = `
You are a Stock AI. You respond professionally and concisely to any stock-related questions or general market queries.
`;

router.post("/api/assistant", async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt) return res.status(400).json({ error: "Prompt is required" });

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: `${stockAIPrompt}\n\nUser: ${prompt}` }] }],
    });

    const aiText = result?.response?.candidates?.[0]?.content?.parts?.[0]?.text || "No response from AI";

    res.json({ text: aiText });
  } catch (error) {
    console.error("❌ Gemini API Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
