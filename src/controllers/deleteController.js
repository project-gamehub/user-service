import UserService from "../services/userService.js";
import { customError } from "../errors/errorUtils/index.js";

const deleteProfile = async (req, res) => {
    const accessToken = req.headers["access-token"];
    if (!accessToken) {
        throw new customError(400, "Token is required");
    }
    const userService = new UserService();
    const tokenData = userService.verifyToken(accessToken);
    if (!tokenData) {
        throw new customError(400, "Invalid token");
    }

    const password = req.body?.password;
    if (!password) {
        throw new customError("Password is required");
    }
    const response = await userService.deleteProfile(
        tokenData.data.id,
        password
    );

    return res.status(200).json({
        message: "Deleted Successfully",
        data: { username: response.username, id: response._id },
        success: true
    });
};

export default deleteProfile;
