import passport from "passport";
import { CLIENT_SECRET, CLIENT_ID, USER_SERVICE_URL } from "../config/index.js";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { handleGoogleUser } from "../controllers/index.js";

passport.use(
    new GoogleStrategy(
        {
            clientID: CLIENT_ID,
            clientSecret: CLIENT_SECRET,
            callbackURL: USER_SERVICE_URL
                ? USER_SERVICE_URL + "/google-web-login/callback"
                : "/google-web-login/callback",
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
