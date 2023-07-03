import { model, InferSchemaType, Schema, Types } from "mongoose";

const ChatSchema = new Schema(
  {
    members: {
      type: [Types.ObjectId],
      ref: "User",
    },
  },
  { timestamps: true }
);

type Chat = InferSchemaType<typeof ChatSchema>;

export default model<Chat>("Chat", ChatSchema);
