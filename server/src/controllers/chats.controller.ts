import { Request, Response, NextFunction } from "express";
import ChatModel from "../models/Chat.model";
import { Types } from "mongoose";

// POST: /chats
export const createChat = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const senderIdObj = new Types.ObjectId(req.body.userId);
  const receiverIdObj = new Types.ObjectId(req.body.friendId);
  try {
    // check if chat already exists
    const chat = await ChatModel.find({
      members: { $all: [senderIdObj] },
    }).find({
      members: { $all: [receiverIdObj] },
    });
    if (chat) return res.status(200).json(chat);
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
export const getChat = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.params.userId;
  const userIdObj = new Types.ObjectId(userId);
  try {
    const chat = await ChatModel.find({
      members: { $in: [userIdObj] },
    }).select("_id members createdAt");
    res.status(200).json(chat);
  } catch (error) {
    res.status(500).json(error);
  }
};

export default { createChat, getChat };
