import { Schema, model } from "mongoose";

const daySchema = new Schema<Day>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    location: String,
    description: {
      type: String,
      required: true,
    },
    picturePath: String,
    userPicturePath: String,
    likes: {
      type: Map,
      of: Boolean,
    },
    comments: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

interface Day {
  userId: Schema.Types.ObjectId;
  username: string;
  location: string;
  description: string;
  picturePath: string;
  userPicturePath: string;
  likes: Map<string, boolean>;
  comments: string[];
}

const DayModel = model<Day>("Day", daySchema);

export { DayModel, Day };
