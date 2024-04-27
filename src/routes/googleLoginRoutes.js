import express from "express";
import passport from "../utils/passport.js";
import { CLIENT_URL } from "../config/index.js";

const googleLoginRouter = express.Router();

googleLoginRouter.get(
    "/",
    passport.authenticate("google", {
        scope: ["profile", "email"],
        successRedirect: "/success",
        failureRedirect: "/failed"
    })
);

googleLoginRouter.get("/callback", (req, res, next) => {
    passport.authenticate("google", (err) => {
        if (err) {
            res.redirect("/google-login/failed");
        } else {
            res.redirect("/google-login/success");
        }
    })(req, res, next);
});

googleLoginRouter.get("/success", (req, res) => {
    const token = req.user;
    res.cookie("access-token", token, { httpOnly: true, secure: true });
    res.redirect(CLIENT_URL);
});

googleLoginRouter.get("/failed", (req, res) => {
    res.redirect(CLIENT_URL + "/?login-failed=true");
});

export default googleLoginRouter;
