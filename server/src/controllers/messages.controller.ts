import { Request, Response, NextFunction } from "express";
import MessageModel from "../models/Message.model";
import { Types } from "mongoose";

// POST: /messages
const createMessage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const newMessage = new MessageModel(req.body);
  try {
    const savedMessage = await newMessage.save();
    res.status(200).json(savedMessage);
  } catch (error) {
    res.status(500).json(error);
  }
};

// GET: /messages/:chatId
const getMessages = async (req: Request, res: Response, next: NextFunction) => {
  const chatId = req.params.chatId;
  const chatIdObj = new Types.ObjectId(chatId);
  try {
    const messages = await MessageModel.find({
      chatId: chatIdObj,
    });
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json(error);
  }
};

export default { createMessage, getMessages };
