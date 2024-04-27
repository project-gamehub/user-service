import passport from "passport";
import { CLIENT_SECRET, CLIENT_ID } from "../config/index.js";

import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { handleGoogleUser } from "../controllers/index.js";

passport.use(
    new GoogleStrategy(
        {
            clientID: CLIENT_ID,
            clientSecret: CLIENT_SECRET,
            callbackURL: "/google-login/callback",
            scope: ["profile", "email"],
            session: false
        },
        async function (accessToken, refreshToken, profile, done) {
            try {
                const token = await handleGoogleUser(profile._json);
                return done(null, token);
            } catch (error) {
                return done(error, null);
            }
        }
    )
);

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

export default passport;
