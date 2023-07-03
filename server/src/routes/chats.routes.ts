import express from "express";
import controller from "../controllers/chats.controller";

const router = express.Router();

// GET OR CREATE CHAT
router.post("/", controller.getOrCreateChat);

// GET CHATS BY USER ID
router.get("/:userId", controller.getChatsByUserId);

export default router;
