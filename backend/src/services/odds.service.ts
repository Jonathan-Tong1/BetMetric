import { Request, Response } from "express";
import axios from "axios";
import { americanToDecimal } from "../utils/odds.utils";

const API_KEY = process.env.ODDS_API_KEY;

export const getOdds = async (req: Request, res: Response) => {
  const { sportKey } = req.params;
  try {
    const response = await axios.get(`https://api.the-odds-api.com/v4/sports/${sportKey}/odds`, {
      params: {
        apiKey: API_KEY,
        regions: "us",
        oddsFormat: "american",
        markets: "h2h",
      },
    });
    res.json(response.data);
  } catch (error: any) {
    console.error(`Error fetching odds for ${sportKey}:`, error.message);
    res.status(500).json({ error: "Failed to fetch odds" });
  }
};

export const getBestOdds = async (req: Request, res: Response) => {
  const { sportKey } = req.params;
  try {
    const response = await axios.get(`https://api.the-odds-api.com/v4/sports/${sportKey}/odds`, {
      params: {
        apiKey: API_KEY,
        regions: "us",
        oddsFormat: "american",
        markets: "h2h",
      },
    });

    const bestOddsPerGame = response.data.map((game: any) => {
      const bestOdds: Record<string, { price: number; bookmaker: string }> = {};

      game.bookmakers.forEach((bookmaker: any) => {
        const h2h = bookmaker.markets.find((m: any) => m.key === "h2h");
        if (h2h) {
          h2h.outcomes.forEach((outcome: any) => {
            const name = outcome.name;
            const price = outcome.price;

            if (
              !bestOdds[name] ||
              (price > 0 && price > bestOdds[name].price) ||
              (price < 0 && price > bestOdds[name].price)
            ) {
              bestOdds[name] = { price, bookmaker: bookmaker.title };
            }
          });
        }
      });

      return {
        id: game.id,
        commence_time: game.commence_time,
        home_team: game.home_team,
        away_team: game.away_team,
        bestOdds,
      };
    });

    res.json(bestOddsPerGame);
  } catch (error: any) {
    console.error("Error fetching and processing best odds:", error.message);
    res.status(500).json({ error: "Failed to fetch best odds" });
  }
};

export const getEV = async (req: Request, res: Response) => {
  const { sportKey } = req.params;
  try {
    const response = await axios.get(`https://api.the-odds-api.com/v4/sports/${sportKey}/odds`, {
      params: {
        apiKey: API_KEY,
        regions: "us",
        oddsFormat: "american",
        markets: "h2h",
      },
    });

    const evBets: {
      gameId: string;
      commence_time: string;
      home_team: string;
      away_team: string;
      team: string;
      bookmaker: string;
      odds: number;
      decimalOdds: string;
      estimatedProbability: string;
      expectedValue: string;
    }[] = [];

    for (const game of response.data) {
      for (const bookmaker of game.bookmakers) {
        const market = bookmaker.markets.find((m: any) => m.key === "h2h");
        if (!market) continue;

        const outcomes = market.outcomes;
        const numOutcomes = outcomes.length;

        for (const outcome of outcomes) {
          const odds = outcome.price;
          const decimalOdds = americanToDecimal(odds);
          const estimatedProb = 1 / numOutcomes;
          const ev = (estimatedProb * (decimalOdds - 1)) + ((1 - estimatedProb) * -1);

          evBets.push({
            gameId: game.id,
            commence_time: game.commence_time,
            home_team: game.home_team,
            away_team: game.away_team,
            team: outcome.name,
            bookmaker: bookmaker.title,
            odds,
            decimalOdds: decimalOdds.toFixed(2),
            estimatedProbability: estimatedProb.toFixed(2),
            expectedValue: ev.toFixed(3),
          });
        }
      }
    }

    res.json(evBets);
  } catch (error: any) {
    console.error("Error calculating EV:", error.message);
    res.status(500).json({ error: "Failed to calculate expected value" });
  }
};
