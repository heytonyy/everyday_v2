import mongoose, { Document, Schema, Types } from "mongoose";

export interface IChat {
  members: [Types.ObjectId];
}

export interface IChatModel extends IChat, Document {}

const ChatSchema: Schema = new Schema(
  {
    members: {
      type: [Types.ObjectId],
      ref: "User",
    },
  },
  { timestamps: true }
);

export default mongoose.model<IChatModel>("Chat", ChatSchema);
