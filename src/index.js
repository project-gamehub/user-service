import express from "express";
import { PORT } from "../src/config/index.js";
import { connectWithDB } from "./utils/index.js";
import router from "./routes/index.js";

const app = express();

// TODO Configure this later
app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, OPTIONS, PUT, PATCH, DELETE"
    );
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});

// TODO Add Limit on this
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/", router);

const server = app.listen(PORT, async () => {
    console.log("Listening on port: ", PORT);
    connectWithDB().catch(() => {
        console.log("Error connecting MongoDB");
    });
});

process.on("unhandledRejection", (err) => {
    console.log(`Unhandled rejection ${err.name} occurred`);
    server.close(() => {
        process.exit(1);
    });
});
