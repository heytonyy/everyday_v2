import express from "express";
import controller from "../controllers/messages.controller";

const router = express.Router();

// CREATE MESSAGE
router.post("/", controller.createMessage);

// GET MESSAGES OF CHAT
router.get("/:chatId", controller.getMessages);

export default router;
