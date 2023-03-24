import express, { RequestHandler } from "express";
import controller from "../controllers/users.controller";
import { verifyToken } from "../middleware/auth.token";

const router = express.Router();

// READ
router.get(
  "/:userId",
  verifyToken as typeof verifyToken & RequestHandler,
  controller.getUser
);
router.get(
  "/:userId/friends",
  verifyToken as typeof verifyToken & RequestHandler,
  controller.getUserFriends
);

// UPDATE
router.patch(
  "/:userId/:friendId",
  verifyToken as typeof verifyToken & RequestHandler,
  controller.addRemoveFriend
);

export default router;
