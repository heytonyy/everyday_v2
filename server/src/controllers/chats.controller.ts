import { Request, Response, NextFunction } from "express";
import ChatModel from "../models/Chat.model";
import { Types } from "mongoose";

// POST: /chats
export const getOrCreateChat = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const senderIdObj = new Types.ObjectId(req.body.userId);
  const receiverIdObj = new Types.ObjectId(req.body.friendId);
  console.log(senderIdObj, receiverIdObj);
  try {
    // check if chat already exists
    const chat = await ChatModel.find({
      members: { $all: [senderIdObj] },
    }).find({
      members: { $all: [receiverIdObj] },
    });
    if (chat.length > 0) {
      return res.status(200).json(chat[0]);
    }

    // if chat not found, create new chat
    const newChat = new ChatModel({
      members: [senderIdObj, receiverIdObj],
    });
    await newChat.save();
    res.status(200).json(newChat);
  } catch (error) {
    res.status(500).json(error);
  }
};

// GET: /chats/:userId
export const getChatsByUserId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = new Types.ObjectId(req.params.userId);
  try {
    const chats = await ChatModel.find({
      members: { $all: [userId] },
    });
    res.status(200).json(chats[0]);
  } catch (error) {
    res.status(500).json(error);
  }
};

export default { getOrCreateChat, getChatsByUserId };
