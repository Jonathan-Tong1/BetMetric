import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import sportsRoutes from "./routes/sports.routes";
import oddsRoutes from "./routes/odds.routes";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
    res.json({
      status: "success",
      message: "BetMetric API is live 🔥",
      endpoints: ["/sports", "/odds/:sportKey", "/odds/best/:sportKey", "/odds/ev/:sportKey"]
    });
  });
  
app.use("/sports", sportsRoutes);
app.use("/odds", oddsRoutes);

export default app;
