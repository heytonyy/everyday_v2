import { model, InferSchemaType, Schema, Types } from "mongoose";

const MessageSchema = new Schema(
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

type Message = InferSchemaType<typeof MessageSchema>;

export default model<Message>("Message", MessageSchema);
