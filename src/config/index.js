import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT;
const MONGOOSE_URL = process.env.MONGOOSE_URL;
const SALTROUNDS = process.env.SALTROUNDS;
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
const NODE_ENV = process.env.NODE_ENV;
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const CLIENT_URL = process.env.CLIENT_URL;
const SESSION_SECRET = process.env.SESSION_SECRET;

export {
    PORT,
    MONGOOSE_URL,
    SALTROUNDS,
    JWT_SECRET_KEY,
    NODE_ENV,
    CLIENT_ID,
    CLIENT_SECRET,
    CLIENT_URL,
    SESSION_SECRET
};
