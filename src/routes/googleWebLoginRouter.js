import express from "express";
import passport from "../utils/passport.js";
import { CLIENT_URL } from "../config/index.js";

const googleWebLoginRouter = express.Router();

googleWebLoginRouter.get(
    "/",
    passport.authenticate("google", ["profile", "email"])
);

googleWebLoginRouter.get(
    "/callback",
    passport.authenticate("google", { session: false }),
    async (req, res) => {
        try {
            const token = req.user;
            res.redirect(CLIENT_URL + "/?access-token=" + token);
        } catch (error) {
            res.redirect(CLIENT_URL + "/?login-failed=true");
        }
    }
);

export default googleWebLoginRouter;
