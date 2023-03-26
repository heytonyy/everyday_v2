import express from "express";
import controller from "../controllers/chats.controller";

const router = express.Router();

// CREATE CHAT
router.post("/", controller.createChat);

// GET CHAT OF USER
// router.post("/:friendId", controller.getChat);

export default router;
