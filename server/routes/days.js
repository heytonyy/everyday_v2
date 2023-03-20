import express from "express";
import { getFeedDays, getUserDay, likeDay } from "../controllers/days.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

// READ
router.get("/", verifyToken, getFeedDays);
router.get("/:userId", verifyToken, getUserDay);

// UPDATE
router.patch("/:id/like", verifyToken, likeDay);

export default router;
