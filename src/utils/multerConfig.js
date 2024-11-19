import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
    destination: (_, __, cb) => {
        cb(null, "uploads/"); // Set the uploads directory
    },
    filename: (_, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const fileFilter = (_, file, cb) => {
    const allowedTypes = /png|jpg|jpeg/;
    const ext = path.extname(file.originalname).toLowerCase();
    if (allowedTypes.test(ext)) {
        cb(null, true);
    } else {
        cb(new Error("Only .png, .jpg, and .jpeg files are allowed!"));
    }
};

const multerConfig = multer({
    storage,
    limits: { fileSize: 2 * 1024 * 1024 },
    fileFilter
});

export default multerConfig;
