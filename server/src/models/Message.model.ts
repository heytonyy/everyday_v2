import mongoose, { Document, Schema, Types } from "mongoose";

export interface IMessage {
  chatId: Types.ObjectId;
  sender: Types.ObjectId;
  message: string;
}

export interface IMessageModel extends IMessage, Document {}

const MessageSchema: Schema = new Schema(
  {
    chatId: {
      type: Types.ObjectId,
      ref: "Chat",
    },
    senderId: {
      type: Types.ObjectId,
      ref: "User",
    },
    text: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model<IMessageModel>("Message", MessageSchema);
