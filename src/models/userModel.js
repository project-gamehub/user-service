import mongoose from "mongoose";
import { mongooseError } from "../errors/errorMiddlewares/index.js";

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true
        },
        email: {
            type: String
        },
        password: {
            type: String
        },
        discord_id: {
            type: String
        },
        discord_username: String,
        name: String,
        location: {
            type: { type: String },
            coordinates: []
        },
        totalFriends: {
            type: Number,
            default: 0
        },
        isPublic: {
            type: Boolean,
            default: true
        },
        avatar: {
            type: String
        }
    },
    { timestamps: true }
);

userSchema.post("save", mongooseError);
userSchema.post("findOneAndUpdate", mongooseError);
userSchema.post("findOne", mongooseError);

const User = mongoose.model("User", userSchema);

export default User;
