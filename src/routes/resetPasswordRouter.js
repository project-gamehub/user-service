import express from "express";
import { requestOtp } from "../controllers/index.js";
import asyncErrorHandler from "../errors/errorUtils/asyncErrorHandler.js";

const resetPasswordRouter = express.Router();

resetPasswordRouter.patch("/request-otp", asyncErrorHandler(requestOtp));

export default resetPasswordRouter;
