import mongoose from "mongoose";

const daySchema = mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    location:  String,
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
        type: Array,
        default: [],
    },
},  { timestamps: true }
);

export default mongoose.model("Day", daySchema);
