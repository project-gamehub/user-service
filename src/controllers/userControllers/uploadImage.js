import UserService from "../../services/userService.js";
import { customError } from "../../errors/errorUtils/index.js";

const uploadImage = async (req, res) => {
    const accessToken = req.headers["access-token"];
    if (!accessToken) {
        throw new customError(400, "Token is required");
    }
    const userService = new UserService();
    const userId = userService.verifyToken(accessToken)?.data.id;
    if (!userId) {
        throw new customError(400, "Invalid token");
    }

    const file = req.file;
    if (!file) {
        throw new customError(400, "No file uploaded");
    }

    const url = await userService.uploadProfileImage(file, userId);

    return res.status(200).json({
        message: "Image uploaded successfully",
        data: url,
        success: true
    });
};

export default uploadImage;
