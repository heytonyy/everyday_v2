import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
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
        min: 6,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    profilePicture: {
        type: String,
        default: "",
    },
    friends: {
        type: Array,
        default: [],
    },
    bio: {
        type: String,
        default: "",
        max: 140,
    },
    impressions: {
        type: Number,
        default: 0,
    }

}, { timestamps: true });

export default mongoose.model("User", UserSchema);