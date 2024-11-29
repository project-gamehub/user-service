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
            type: {
                type: String,
                enum: ["Point"], // GeoJSON type
                default: "Point"
            },
            coordinates: {
                type: [Number], // Array of numbers [longitude, latitude]
                required: true
            },
            lastUpdatedTime: {
                type: Date,
                default: Date.now
            }
        },
        isPublic: {
            type: Boolean,
            default: true
        },
        avatar: {
            type: String
        },
        name: {
            type: String
        },
        isGoogleLogin: {
            type: Boolean,
            default: false
        },
        isUsernameSet: {
            type: Boolean,
            default: false
        }
    },
    { timestamps: true }
);

userSchema.index({ location: "2dsphere" });
userSchema.post("save", mongooseError);
userSchema.post("findOneAndUpdate", mongooseError);
userSchema.post("findOne", mongooseError);

const User = mongoose.model("User", userSchema);

export default User;
