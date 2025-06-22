// "use client";

// import { useEffect, useState } from "react";

// interface EVBet {
//   gameId: string;
//   commence_time: string;
//   home_team: string;
//   away_team: string;
//   team: string;
//   bookmaker: string;
//   odds: number;
//   decimalOdds: string;
//   estimatedProbability: string;
//   expectedValue: string;
// }

// export default function EVPage() {
//   const [evBets, setEvBets] = useState<EVBet[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [sportKey, setSportKey] = useState("baseball_mlb");

//   const fetchEVBets = async () => {
//     try {
//       const res = await fetch(`http://localhost:4000/odds/ev/${sportKey}`);
//       const data = await res.json();
//       setEvBets(data);
//     } catch (err) {
//       console.error("Error fetching EV bets:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchEVBets();
//     const interval = setInterval(fetchEVBets, 30000);
//     return () => clearInterval(interval);
//   }, [sportKey]);

//   return (
//     <main className="p-6">
//       <h1 className="text-2xl font-bold mb-4">EV Bets</h1>

//       <div className="mb-4">
//         <label htmlFor="sport-select" className="mr-2 font-medium">
//           Select Sport:
//         </label>
//         <select
//           id="sport-select"
//           className="border px-2 py-1 rounded"
//           value={sportKey}
//           onChange={(e) => setSportKey(e.target.value)}
//         >
//           <option value="baseball_mlb">MLB</option>
//           <option value="basketball_nba">NBA</option>
//           <option value="icehockey_nhl">NHL</option>
//           <option value="americanfootball_nfl">NFL</option>
//         </select>
//       </div>

//       {loading ? (
//         <p>Loading...</p>
//       ) : (
//         <div className="overflow-x-auto">
//           <table className="min-w-full border border-gray-300">
//             <thead>
//               <tr className="bg-gray-100">
//                 <th className="px-4 py-2 text-left">Game</th>
//                 <th className="px-4 py-2 text-left">Team</th>
//                 <th className="px-4 py-2 text-left">Odds</th>
//                 <th className="px-4 py-2 text-left">Decimal</th>
//                 <th className="px-4 py-2 text-left">Bookmaker</th>
//                 <th className="px-4 py-2 text-left">Est. Prob</th>
//                 <th className="px-4 py-2 text-left">EV</th>
//               </tr>
//             </thead>
//             <tbody>
//               {evBets.map((bet) => (
//                 <tr key={`${bet.gameId}-${bet.team}`} className="border-t">
//                   <td className="px-4 py-2">
//                     {bet.away_team} @ {bet.home_team}
//                     <br />
//                     <span className="text-sm text-gray-500">
//                       {new Date(bet.commence_time).toLocaleString()}
//                     </span>
//                   </td>
//                   <td className="px-4 py-2">{bet.team}</td>
//                   <td className="px-4 py-2">
//                     {bet.odds > 0 ? `+${bet.odds}` : bet.odds}
//                   </td>
//                   <td className="px-4 py-2">{bet.decimalOdds}</td>
//                   <td className="px-4 py-2">{bet.bookmaker}</td>
//                   <td className="px-4 py-2">
//                     {(parseFloat(bet.estimatedProbability) * 100).toFixed(0)}%
//                   </td>
//                   <td
//                     className={`px-4 py-2 font-semibold ${
//                       parseFloat(bet.expectedValue) > 0
//                         ? "text-green-600"
//                         : "text-red-600"
//                     }`}
//                   >
//                     {bet.expectedValue}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </main>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
} from "@mui/material";

interface EVBet {
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
}

export default function EVPage() {
  const [evBets, setEvBets] = useState<EVBet[]>([]);
  const [loading, setLoading] = useState(true);
  const [sportKey, setSportKey] = useState("baseball_mlb");

  const fetchEVBets = async () => {
    try {
      const res = await fetch(`http://localhost:4000/odds/ev/${sportKey}`);
      const data = await res.json();
      setEvBets(data);
    } catch (err) {
      console.error("Error fetching EV bets:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEVBets();
    const interval = setInterval(fetchEVBets, 30000);
    return () => clearInterval(interval);
  }, [sportKey]);

  return (
    <main className="p-6">
      <Typography variant="h4" gutterBottom>
        EV Bets
      </Typography>

      <FormControl variant="outlined" size="small" sx={{ mb: 2, minWidth: 200 }}>
        <InputLabel id="sport-select-label">Select Sport</InputLabel>
        <Select
          labelId="sport-select-label"
          value={sportKey}
          label="Select Sport"
          onChange={(e) => setSportKey(e.target.value)}
        >
          <MenuItem value="baseball_mlb">MLB</MenuItem>
          <MenuItem value="basketball_nba">NBA</MenuItem>
          <MenuItem value="icehockey_nhl">NHL</MenuItem>
          <MenuItem value="americanfootball_nfl">NFL</MenuItem>
        </Select>
      </FormControl>

      {loading ? (
        <Typography>Loading...</Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Game</TableCell>
                <TableCell>Team</TableCell>
                <TableCell>Odds</TableCell>
                <TableCell>Decimal</TableCell>
                <TableCell>Bookmaker</TableCell>
                <TableCell>Est. Prob</TableCell>
                <TableCell>EV</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {evBets.map((bet) => (
                <TableRow key={`${bet.gameId}-${bet.team}`}>
                  <TableCell>
                    {bet.away_team} @ {bet.home_team}
                    <br />
                    <Typography variant="caption" color="text.secondary">
                      {new Date(bet.commence_time).toLocaleString()}
                    </Typography>
                  </TableCell>
                  <TableCell>{bet.team}</TableCell>
                  <TableCell>{bet.odds > 0 ? `+${bet.odds}` : bet.odds}</TableCell>
                  <TableCell>{bet.decimalOdds}</TableCell>
                  <TableCell>{bet.bookmaker}</TableCell>
                  <TableCell>
                    {(parseFloat(bet.estimatedProbability) * 100).toFixed(0)}%
                  </TableCell>
                  <TableCell
                    sx={{
                      color:
                        parseFloat(bet.expectedValue) > 0 ? "green" : "red",
                      fontWeight: "bold",
                    }}
                  >
                    {bet.expectedValue}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </main>
  );
}

