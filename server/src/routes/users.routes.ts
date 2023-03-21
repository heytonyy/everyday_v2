import express, { RequestHandler } from "express";
import controllers from "../controllers/users.controllers";
import { verifyToken } from "../middleware/auth.token";

const router = express.Router();

// READ
router.get(
  "/:userId",
  verifyToken as typeof verifyToken & RequestHandler,
  controllers.getUser
);
router.get(
  "/:userId/friends",
  verifyToken as typeof verifyToken & RequestHandler,
  controllers.getUserFriends
);

// UPDATE
router.patch(
  "/:userId/:friendId",
  verifyToken as typeof verifyToken & RequestHandler,
  controllers.addRemoveFriend
);

export default router;
