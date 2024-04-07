import express from "express";
import { PORT } from "../src/config/index.js";
import { connectWithDB } from "./utils/index.js";
import bodyParser from "body-parser";
import router from "./routes/index.js";

const app = express();

app.use(bodyParser.json());
// Add restriction in future
app.use(bodyParser.urlencoded({ extended: false }));

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
