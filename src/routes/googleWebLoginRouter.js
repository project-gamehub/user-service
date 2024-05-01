import express from "express";
import passport from "../utils/passport.js";
import { CLIENT_URL } from "../config/index.js";

const googleWebLoginRouter = express.Router();

googleWebLoginRouter.get(
    "/",
    passport.authenticate("google", ["profile", "email"])
);

googleWebLoginRouter.get("/callback", (req, res, next) => {
    passport.authenticate("google", (err, token) => {
        if (err) {
            return res.redirect("/google-web-login/failed");
        }
        res.cookie("access-token", token, { httpOnly: true, secure: true });
        res.redirect("/google-web-login/success");
    })(req, res, next);
});

googleWebLoginRouter.get("/success", (req, res) => {
    res.redirect(CLIENT_URL);
});

googleWebLoginRouter.get("/failed", (req, res) => {
    res.redirect(CLIENT_URL + "/?login-failed=true");
});

export default googleWebLoginRouter;
