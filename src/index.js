import express from "express";
import { PORT, SESSION_SECRET } from "../src/config/index.js";
import { connectWithDB, passport } from "./utils/index.js";
import router from "./routes/index.js";
import cors from "cors";
import session from "express-session";
import { handleGoogleUser } from "./controllers/index.js";

const app = express();

const initializeServer = () => {
    // TODO Configure this later
    app.use(cors());

    // TODO Add Limit on this
    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());

    app.use(
        session({
            secret: SESSION_SECRET,
            resave: false,
            saveUninitialized: false
        })
    );
    app.use(passport.initialize());
    app.use(passport.session());

    connectWithDB().catch(() => {
        console.log("Error connecting MongoDB");
    });

    app.use("/", router);
};

const server = app.listen(PORT, async () => {
    initializeServer();
    console.log("Listening on port: ", PORT);
});

process.on("unhandledRejection", (err) => {
    console.log(`Unhandled rejection ${err.name} occurred`);
    console.log(err);
    server.close(() => {
        process.exit(1);
    });
});
