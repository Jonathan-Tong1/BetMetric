"use client";

import { useEffect, useState } from "react";
import {
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  Paper,
  CircularProgress,
  Chip,
} from "@mui/material";

type Game = {
  id: string;
  commence_time: string;
  home_team: string;
  away_team: string;
  bestOdds: Record<string, { price: number; bookmaker: string }>;
};

export default function HomePage() {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [sportKey, setSportKey] = useState("baseball_mlb");

  useEffect(() => {
    const fetchOdds = async () => {
      try {
        const res = await fetch(`http://localhost:4000/odds/best/${sportKey}`);
        const data = await res.json();
        setGames(data);
      } catch (error) {
        console.error("Failed to fetch odds:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOdds();
    const interval = setInterval(fetchOdds, 30000);
    return () => clearInterval(interval);
  }, [sportKey]);

  const hasArbitrage = (game: Game): boolean => {
    const sumInverse = Object.values(game.bestOdds).reduce((sum, odds) => {
      const decimal =
        odds.price > 0
          ? odds.price / 100 + 1
          : 100 / Math.abs(odds.price) + 1;
      return sum + 1 / decimal;
    }, 0);
    return sumInverse < 1;
  };

  return (
    <main style={{ padding: "24px" }}>
      <Typography variant="h4" gutterBottom>
        Best Odds
      </Typography>

      <FormControl variant="outlined" size="small" sx={{ mb: 3, minWidth: 200 }}>
        <InputLabel id="sport-select-label">Select Sport</InputLabel>
        <Select
          labelId="sport-select-label"
          value={sportKey}
          label="Select Sport"
          onChange={(e) => setSportKey(e.target.value)}
        >
          <MenuItem value="baseball_mlb">MLB</MenuItem>
          <MenuItem value="basketball_nba">NBA</MenuItem>
          <MenuItem value="americanfootball_nfl">NFL</MenuItem>
        </Select>
      </FormControl>

      {loading ? (
        <CircularProgress />
      ) : (
        <TableContainer component={Paper}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Game</TableCell>
                <TableCell>Team</TableCell>
                <TableCell align="right">Odds</TableCell>
                <TableCell align="right">Bookmaker</TableCell>
                <TableCell align="center">Arb?</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {games.map((game) =>
                Object.entries(game.bestOdds).map(([team, { price, bookmaker }], idx) => (
                  <TableRow key={`${game.id}-${team}`}>
                    {idx === 0 ? (
                      <TableCell rowSpan={Object.keys(game.bestOdds).length}>
                        {game.away_team} @ {game.home_team}
                        <br />
                        <Typography variant="caption" color="text.secondary">
                          {new Date(game.commence_time).toLocaleString()}
                        </Typography>
                      </TableCell>
                    ) : null}
                    <TableCell>{team}</TableCell>
                    <TableCell
                      align="right"
                      sx={{
                        color: price > 0 ? "green" : "red",
                        fontWeight: "bold",
                      }}
                    >
                      {price > 0 ? `+${price}` : price}
                    </TableCell>
                    <TableCell align="right" sx={{ color: "text.secondary" }}>
                      {bookmaker}
                    </TableCell>
                    {idx === 0 ? (
                      <TableCell
                        rowSpan={Object.keys(game.bestOdds).length}
                        align="center"
                      >
                        {hasArbitrage(game) ? (
                          <Chip label="Yes" color="success" size="small" />
                        ) : (
                          <Chip label="No" size="small" />
                        )}
                      </TableCell>
                    ) : null}
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </main>
  );
}
