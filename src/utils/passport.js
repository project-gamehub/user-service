import passport from "passport";
import { CLIENT_SECRET, CLIENT_ID } from "../config/index.js";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { handleGoogleUser } from "../controllers/index.js";

passport.use(
    new GoogleStrategy(
        {
            clientID: CLIENT_ID,
            clientSecret: CLIENT_SECRET,
            callbackURL: "/google-web-login/callback",
            scope: ["profile", "email"],
            session: false
        },
        async (_, __, profile, done) => {
            try {
                const token = await handleGoogleUser(profile._json);
                return done(null, token);
            } catch (error) {
                return done(error, null);
            }
        }
    )
);

export default passport;
