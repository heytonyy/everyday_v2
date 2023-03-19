import { Schema, model } from "mongoose";

const UserSchema = new Schema<User>(
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

interface User {
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

const UserModel = model<User>("User", UserSchema);

export { UserModel, User };
