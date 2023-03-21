import { Request, Response } from "express";
import { Types } from "mongoose";
import User from "../models/User.model";

// GET: /users/:userId
const getUser = async (req: Request, res: Response) => {
  const userIdObj = new Types.ObjectId(req.params.userId);
  try {
    // user without __v and password
    const user = await User.findById(userIdObj).select("-__v -password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error });
  }
};

// GET: /users/:userId/friends
const getUserFriends = async (req: Request, res: Response) => {
  const userIdObj = new Types.ObjectId(req.params.userId);
  try {
    const user = await User.findById(userIdObj);
    if (!user) return res.status(404).json({ message: "User not found" });
    // return friends list without __v and password
    const friends = await User.find({ _id: { $in: user.friends } }).select(
      "_id username firstName lastName bio location picturePath"
    );
    res.status(200).json(friends);
  } catch (error) {
    res.status(500).json({ error });
  }
};

// PATCH: /users/:userId/:friendId
const addRemoveFriend = async (req: Request, res: Response) => {
  const userIdObj = new Types.ObjectId(req.params.userId);
  const friendIdObj = new Types.ObjectId(req.params.friendId);
  try {
    const user = await User.findByIdAndUpdate(userIdObj, {}, { new: true });
    const friend = await User.findByIdAndUpdate(friendIdObj, {}, { new: true });
    if (!user || !friend)
      return res.status(404).json({ message: "User not found" });
    // have to use .equals() because user.friends is an array of ObjectId's
    if (user.friends.includes(friendIdObj)) {
      user.friends = user.friends.filter((id) => !id.equals(friendIdObj));
      friend.friends = friend.friends.filter((id) => !id.equals(userIdObj));
    } else {
      user.friends.push(friendIdObj);
      friend.friends.push(userIdObj);
    }
    await user.save();
    await friend.save();
    // get new list of users friends and format so not all info sent to frontend
    const friends = await Promise.all(
      user.friends.map((id) =>
        User.findById(id).select(
          "_id username firstName lastName bio location picturePath"
        )
      )
    );
    res.status(200).json(friends);
  } catch (err: any) {
    res.status(404).json({ message: err.message });
  }
};

export default { getUser, getUserFriends, addRemoveFriend };
