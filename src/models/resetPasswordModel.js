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
            default: Date.now,
            expires: 3600
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

resetPasswordSchema.pre("findOneAndUpdate", (next) => {
    if (this.isModified("lastRequestedTime")) {
        this.expires = 3600;
    }
    next();
});

const resetPassword = mongoose.model("resetPassword", resetPasswordSchema);

export default resetPassword;
