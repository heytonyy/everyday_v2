import { NextFunction, Request, Response } from "express";
import { Types } from "mongoose";
import Day from "../models/Day.model";
import User from "../models/User.model";

// POST: /days/create
const createDay = async (req: Request, res: Response) => {
  const userId = new Types.ObjectId(req.body.userId);
  const { description, location, picturePath } = req.body;
  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });
    // create new day
    const newDay = new Day({
      userId,
      username: user.username,
      userPicturePath: user.picturePath,
      description,
      location,
      picturePath,
      likes: {},
      comments: [],
    });
    // save new day
    await newDay.save();
    const allDays = await Day.find();
    res.status(201).json(allDays);
  } catch (error) {
    res.status(500).json({ error });
  }
};

// GET: /days/feed
const getFeedDays = async (req: Request, res: Response) => {
  try {
    const days = await Day.find();
    res.status(200).json(days);
  } catch (error) {
    res.status(404).json({ error });
  }
};

// GET: /days/:userId
const getUserDays = async (req: Request, res: Response) => {
  const userId = new Types.ObjectId(req.params.userId);
  try {
    const days = await Day.find({ userId });
    res.status(200).json(days);
  } catch (error) {
    res.status(404).json({ error });
  }
};

// PATCH: /days/:dayId/like
const likeDay = async (req: Request, res: Response) => {
  const dayId = new Types.ObjectId(req.params.dayId);
  const userId = new Types.ObjectId(req.body.userId);
  try {
    const day = await Day.findById(dayId);
    if (!day) {
      return res.status(404).json({ message: "Day not found" });
    }

    // likes map is of type { [key: string]: boolean }
    const isLiked = day.likes.get(userId.toString());
    if (isLiked) {
      day.likes.delete(userId.toString());
    } else {
      day.likes.set(userId.toString(), true);
    }

    // save updated day and send it to frontend
    const updatedDay = await Day.findByIdAndUpdate(
      dayId,
      { likes: day.likes },
      { new: true }
    );
    res.status(200).json(updatedDay);
  } catch (error) {
    res.status(500).json({ error });
  }
};

// DELETE: /days/:userId/:dayId/delete
const deleteDay = async (req: Request, res: Response, next: NextFunction) => {};

export default { createDay, getFeedDays, getUserDays, likeDay, deleteDay };
