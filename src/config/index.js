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
const OTP_SERVICE_URL = process.env.OTP_SERVICE_URL;
const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;
const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET;

export {
    PORT,
    MONGOOSE_URL,
    SALTROUNDS,
    JWT_SECRET_KEY,
    NODE_ENV,
    CLIENT_ID,
    CLIENT_SECRET,
    CLIENT_URL,
    OTP_SERVICE_URL,
    CLOUDINARY_CLOUD_NAME,
    CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET
};
