import dotenv from "dotenv";
dotenv.config();

import { Router } from "express";
import axios from "axios";

const router = Router();
const API_KEY = process.env.ODDS_API_KEY;

router.get("/", async (_req, res) => {
  try {
    const response = await axios.get("https://api.the-odds-api.com/v4/sports", {
      params: { apiKey: API_KEY },
    });
    const inSeason = response.data.filter((sport: any) => sport.active);
    res.json(inSeason);
  } catch (error: any) {
    console.error("Error fetching sports:", error.message);
    res.status(500).json({ error: "Failed to fetch sports" });
  }
});

export default router;
