import express from "express";
import {
  getFeedDays,
  getUserDay,
  likeDay,
} from "../controllers/days.controllers";
import { verifyToken } from "../middleware/auth.token";

const router = express.Router();

// READ
router.get("/", verifyToken, getFeedDays);
router.get("/:userId", verifyToken, getUserDay);

// UPDATE
router.patch("/:id/like", verifyToken, likeDay);

export default router;
