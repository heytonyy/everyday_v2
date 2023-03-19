import { DayModel } from "../models/Day.model";
import { UserModel } from "../models/User.model";
import { Request, Response } from "express";
import { Schema } from "mongoose";

// CREATE
export const createDay = async (req: Request, res: Response) => {
  const userId = new Schema.Types.ObjectId(req.body.id);
  const { description, location, picturePath } = req.body;
  const user = await UserModel.findById(userId).select("-password").lean();
  const newDay = new DayModel({
    userId,
    username: user.username,
    userPicturePath: user.picturePath,
    description,
    location,
    picturePath,
    likes: {},
    comments: [],
  });
  await newDay.save();

  const day = await DayModel.find().lean();
  res.status(201).json(day);
  try {
    const savedDay = await newDay.save();
    const dayObj = savedDay.toObject();
    res.status(201).json(dayObj);
  } catch (error: any) {
    res.status(409).json({ msg: error.message });
  }
};

// READ
export const getFeedDays = async (req: Request, res: Response) => {
  try {
    const days = await DayModel.find().lean();
    res.status(200).json(days);
  } catch (error: any) {
    res.status(404).json({ msg: error.message });
  }
};

export const getUserDay = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const days = await DayModel.find({ userId }).lean();
    res.status(200).json(days);
  } catch (error: any) {
    res.status(404).json({ msg: error.message });
  }
};

// UPDATE
export const likeDay = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const userId = new Schema.Types.ObjectId(req.body.id);
    const day = await DayModel.findById(userId);
    if (!day) {
      return res.status(404).json({ msg: "Day not found" });
    }
    // update like
    const isLiked = day.likes.get(id);
    if (isLiked) {
      day.likes.delete(id);
    } else {
      day.likes.set(id, true);
    }
    // new value to send to frontend
    const updatedDay = await DayModel.findByIdAndUpdate(
      userId,
      { likes: day.likes },
      { new: true }
    ).lean();
    res.status(200).json(updatedDay);
  } catch (error: any) {
    res.status(404).json({ msg: error.message });
  }
};
