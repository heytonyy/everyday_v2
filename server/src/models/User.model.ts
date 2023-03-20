import mongoose, { Document, Schema } from "mongoose";

export interface IUser {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  location: string;
  bio: string;
  picturePath: string;
  friends: Schema.Types.ObjectId[];
  impressions: number;
}

export interface IUserModel extends IUser, Document {}

const UserSchema: Schema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      min: 3,
      max: 20,
    },
    firstName: {
      type: String,
      required: true,
      min: 3,
      max: 20,
    },
    lastName: {
      type: String,
      required: true,
      min: 3,
      max: 20,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      max: 50,
    },
    password: {
      type: String,
      required: true,
      min: 8,
    },
    location: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
      required: true,
      max: 140,
    },
    picturePath: {
      type: String,
      default: "",
    },
    friends: {
      type: [Schema.Types.ObjectId],
      ref: "User",
      default: [],
    },
    impressions: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.model<IUserModel>("User", UserSchema);
