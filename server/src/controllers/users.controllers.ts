import { Request, Response } from "express";
import User from "../models/User.model";

// GET: /users/:userId
const getUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId).select("-__v -password");
    // if user not found
    if (!user) return res.status(404).json({ message: "User not found" });
    // return user without __v and password
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ error });
  }
};

// GET: /users/:userId/friends
const getUserFriends = async (req: Request, res: Response) => {
  const userId = req.params.userId;
  try {
    const user = await User.findById(userId);
    // if user not found
    if (!user) return res.status(404).json({ message: "User not found" });
    // return friends list without __v and password
    const friends = await User.find({ _id: { $in: user.friends } }).select(
      "-__v -password"
    );
    res.status(200).json({ friends });
  } catch (error) {
    res.status(500).json({ error });
  }
};

// PATCH: /users/:userId/:friendId
const addRemoveFriend = async (req: Request, res: Response) => {
  const userId = req.params.userId;
  const friendId = req.params.friendId;
  try {
    const user = await User.findById(userId).select("-__v -password");
    const friend = await User.findById(friendId).select("-__v -password");
    // if user or friend not found
    if (!user) return res.status(404).json({ message: "User not found" });
    if (!friend) return res.status(404).json({ message: "Friend not found" });
    // check if friendId is already in user's friends list and remove it, otherwise add it
    if (user.friends.includes(friend._id)) {
      user.friends = user.friends.filter((id) => id !== friend._id);
      friend.friends = friend.friends.filter((id) => id !== user._id);
    } else {
      user.friends.push(user._id);
      friend.friends.push(friend._id);
    }
    // save updated user and friend documents
    await user.save();
    await friend.save();
    // return updated friends list without __v and password
    const newFriendsList = await User.find({
      _id: { $in: user.friends },
    }).select("-__v -password");
    res.status(200).json(newFriendsList);
  } catch (error) {
    res.status(500).json({ error });
  }
};

export default { getUser, getUserFriends, addRemoveFriend };
