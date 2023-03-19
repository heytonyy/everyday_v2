import { UserModel, User } from "../models/User.model";
import { Request, Response } from "express";
import { Document, Schema } from "mongoose";

// READ
export const getUser = async (req: Request, res: Response) => {
  try {
    const userId = new Schema.Types.ObjectId(req.params.id);
    // .select("-password") removes password from returned user
    const user = await UserModel.findById(userId).select("-password").lean();
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// getUserFriends controller
export const getUserFriends = async (req: Request, res: Response) => {
  try {
    const userId = new Schema.Types.ObjectId(req.params.id);
    // .lean() returns a plain javascript object instead of a mongoose document
    const user = await UserModel.findById(userId).select("-password").lean();
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // get all friends with out passwords as plain javascript objects
    const friends = await Promise.all(
      user.friends.map((friendId) =>
        UserModel.findById(friendId).select("-password").lean()
      )
    );
    res.status(200).json(friends);
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
};

// UPDATE
export const addRemoveFriend = async (req: Request, res: Response) => {
  try {
    const userId = new Schema.Types.ObjectId(req.params.id);
    const friendId = new Schema.Types.ObjectId(req.params.friendId);
    // get user and their friends
    const user = (await UserModel.findById(userId)) as Document & User;
    const friend = (await UserModel.findById(friendId)) as Document & User;
    // check if friend is already in user's friends list
    if (user.friends.includes(friendId)) {
      user.friends = user.friends.filter((id) => id !== friendId);
      friend.friends = friend.friends.filter((fId) => fId !== userId);
    } else {
      user.friends.push(friendId);
      friend.friends.push(userId);
    }
    // save changes
    await user.save();
    await friend.save();
    // returns list of all friends with out passwords as plain javascript objects
    const friends = await Promise.all(
      user.friends.map((friendId) =>
        UserModel.findById(friendId).select("-password").lean()
      )
    );
    res.status(200).json(friends);
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
};
