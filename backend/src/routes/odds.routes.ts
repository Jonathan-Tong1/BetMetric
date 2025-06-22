import { Router } from "express";
import { getOdds, getBestOdds, getEV } from "../services/odds.service";

const router = Router();

router.get("/:sportKey", getOdds);
router.get("/best/:sportKey", getBestOdds);
router.get("/ev/:sportKey", getEV);

export default router;
