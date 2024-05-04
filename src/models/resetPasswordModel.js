import mongoose from "mongoose";

const resetPasswordSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true
        },
        otp: {
            type: String,
            required: true
        },
        requestedAt: {
            type: Date,
            default: Date.now
        },
        requestAttempts: {
            type: Number,
            default: 1
        },
        verifyAttempts: {
            type: Number,
            default: 1
        },
        lastRequestedTime: {
            type: Date,
            default: Date.now
        }
    },
    { timestamps: true }
);

resetPasswordSchema.index({ requestedAt: 1 }, { expireAfterSeconds: 3600 });

const resetPassword = mongoose.model("resetPassword", resetPasswordSchema);

export default resetPassword;
