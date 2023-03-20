import { NextFunction, Request, Response } from "express";
import Day from "../models/Day.model";
import User from "../models/User.model";

// POST: /days/create
const createDay = async (req: Request, res: Response) => {
  const { userId, description, location, picturePath } = req.body;
  try {
    const user = await User.findById(userId).select("-__v -password");
    // if user not found
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
    res.status(201).json(newDay);
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
  const userId = req.params.userId;
  try {
    const days = await Day.find({ userId });
    res.status(200).json(days);
  } catch (error) {
    res.status(404).json({ error });
  }
};

// PATCH: /days/:userId/like
const likeDay = async (req: Request, res: Response) => {
  const userId = req.params.userId;
  try {
    const day = await Day.findById(userId);
    // if day not found
    if (!day) return res.status(404).json({ message: "Day not found" });
    // check if userId is already in day's likes list and remove it, otherwise add it
    const isLiked = day.likes.get(userId);
    if (isLiked) {
      day.likes.delete(userId);
    } else {
      day.likes.set(userId, true);
    }
    // save updated day and send it to frontend
    const updatedDay = await Day.findByIdAndUpdate(
      userId,
      { likes: day.likes },
      { new: true }
    );
    res.status(200).json(updatedDay);
  } catch (error) {
    res.status(500).json({ error });
  }
};

// DELETE: /days/:userId
const deleteDay = async (req: Request, res: Response, next: NextFunction) => {};

export default { createDay, getFeedDays, getUserDays, likeDay, deleteDay };

// // UPDATE
// export const likeDay = async (req: Request, res: Response) => {
//   try {
//     const id = req.params.id;
//     const userId = new Schema.Types.ObjectId(req.body.id);
//     const day = await DayModel.findById(userId);
//     if (!day) {
//       return res.status(404).json({ msg: "Day not found" });
//     }
//     // update like
//     const isLiked = day.likes.get(id);
//     if (isLiked) {
//       day.likes.delete(id);
//     } else {
//       day.likes.set(id, true);
//     }
//     // new value to send to frontend
//     const updatedDay = await DayModel.findByIdAndUpdate(
//       userId,
//       { likes: day.likes },
//       { new: true }
//     ).lean();
//     res.status(200).json(updatedDay);
//   } catch (error: any) {
//     res.status(404).json({ msg: error.message });
//   }
// };
