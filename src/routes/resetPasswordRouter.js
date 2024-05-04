import express from "express";
import { requestOtp } from "../controllers/index.js";

const resetPasswordRouter = express.Router();

resetPasswordRouter.patch("/request-otp", requestOtp);

export default resetPasswordRouter;
