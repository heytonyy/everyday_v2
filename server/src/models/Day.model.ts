import mongoose, { Document, Schema, Types } from "mongoose";

export interface IDay {
  userId: Types.ObjectId;
  username: string;
  location: string;
  description: string;
  picturePath: string;
  userPicturePath: string;
  likes: Map<string, boolean>;
  comments: string[];
}

export interface IDayModel extends IDay, Document {}

const DaySchema: Schema = new Schema(
  {
    userId: {
      type: Types.ObjectId,
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

export default mongoose.model<IDayModel>("Day", DaySchema);
