import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT;
const MONGOOSE_URL = process.env.MONGOOSE_URL;
const SALTROUNDS = process.env.SALTROUNDS;
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
const NODE_ENV = process.env.NODE_ENV;

export { PORT, MONGOOSE_URL, SALTROUNDS, JWT_SECRET_KEY, NODE_ENV };
