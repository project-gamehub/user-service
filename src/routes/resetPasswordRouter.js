import express from "express";
import { requestOtp, resendOtp, submitOtp } from "../controllers/index.js";
import asyncErrorHandler from "../errors/errorUtils/asyncErrorHandler.js";

const resetPasswordRouter = express.Router();

resetPasswordRouter.patch("/request-otp", asyncErrorHandler(requestOtp));

resetPasswordRouter.patch("/resend-otp", asyncErrorHandler(resendOtp));

resetPasswordRouter.patch("/submit-otp", asyncErrorHandler(submitOtp));

export default resetPasswordRouter;
