import express, { RequestHandler } from "express";
import controllers from "../controllers/days.controllers";
import { verifyToken } from "../middleware/auth.token";

const router = express.Router();

// CREATE
router.post(
  "/create",
  verifyToken as typeof verifyToken & RequestHandler,
  controllers.createDay
);

// READ
router.get(
  "/feed",
  verifyToken as typeof verifyToken & RequestHandler,
  controllers.getFeedDays
);
router.get(
  "/:userId",
  verifyToken as typeof verifyToken & RequestHandler,
  controllers.getUserDays
);

// UPDATE
router.patch(
  "/:dayId/like",
  verifyToken as typeof verifyToken & RequestHandler,
  controllers.likeDay
);

export default router;
