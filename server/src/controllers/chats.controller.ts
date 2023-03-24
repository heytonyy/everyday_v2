import { Request, Response, NextFunction } from "express";
import ChatModel from "../models/Chat.model";
import { Types } from "mongoose";

// POST: /chats
export const createChat = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const senderIdObj = new Types.ObjectId(req.body.senderId);
  const receiverIdObj = new Types.ObjectId(req.body.receiverId);
  try {
    const findChat = await ChatModel.findOne({
      members: [senderIdObj, receiverIdObj],
    });
    if (findChat) return res.status(200).json(findChat);
    // if chat not found, create new chat
    const newchat = new ChatModel({
      members: [senderIdObj, receiverIdObj],
    });
    const savedchat = await newchat.save();
    res.status(200).json(savedchat);
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
