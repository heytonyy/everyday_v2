import Day from "../models/Day.js";
import User from "../models/User.js";

// CREATE
export const createDay = async (req, res) => {
  const { userId, description, location, picturePath } = req.body;
  const user = await User.findById(userId);
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
  await newDay.save();

  const day = await Day.find();
  res.status(201).json(day);
  try {
    const savedDay = await newDay.save();
    res.status(201).json(savedDay);
  } catch (error) {
    res.status(409).json({ msg: error.message });
  }
};

// READ
export const getFeedDays = async (req, res) => {
  try {
    const days = await Day.find();
    res.status(200).json(days);
  } catch (error) {
    res.status(404).json({ msg: error.message });
  }
};

export const getUserDay = async (req, res) => {
  try {
    const { userId } = req.params;
    const days = await Day.find({ userId });
    res.status(200).json(days);
  } catch (error) {
    res.status(404).json({ msg: error.message });
  }
};

// UPDATE
export const likeDay = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const day = await Day.findById(id);
    const isLiked = day.likes.get(userId);
    // update like
    if (isLiked) {
      day.likes.delete(userId);
    } else {
      day.likes.set(userId, true);
    }
    // new value to send to frontend
    const updatedDay = await Day.findByIdAndUpdate(
      id,
      { likes: day.likes },
      { new: true }
    );
    res.status(200).json(updatedDay);
  } catch (error) {
    res.status(404).json({ msg: error.message });
  }
};
