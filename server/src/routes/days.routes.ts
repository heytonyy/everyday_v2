import express, { RequestHandler } from "express";
import controller from "../controllers/days.controller";
import { verifyToken } from "../middleware/auth.token";

const router = express.Router();

// CREATE
router.post(
  "/create",
  verifyToken as typeof verifyToken & RequestHandler,
  controller.createDay
);

// READ
router.get(
  "/feed",
  verifyToken as typeof verifyToken & RequestHandler,
  controller.getFeedDays
);
router.get(
  "/:userId",
  verifyToken as typeof verifyToken & RequestHandler,
  controller.getUserDays
);

// UPDATE
router.patch(
  "/:dayId/like",
  verifyToken as typeof verifyToken & RequestHandler,
  controller.likeDay
);

export default router;
