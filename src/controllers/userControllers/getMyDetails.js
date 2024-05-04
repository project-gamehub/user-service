import UserService from "../../services/userService.js";
import { customError } from "../../errors/errorUtils/index.js";

const getMyDetails = async (req, res) => {
    const accessToken = req.headers["access-token"];
    if (!accessToken) {
        throw new customError(400, "Token is required");
    }
    const userService = new UserService();
    const tokenData = userService.verifyToken(accessToken);
    if (!tokenData) {
        throw new customError(400, "Invalid token");
    }

    const userData = await userService.getUserDetails(
        { _id: tokenData.data.id },
        "-createdAt -updatedAt -__v"
    );

    return res.status(200).json({
        message: "Details fetched successfully",
        data: userData,
        success: true
    });
};

export default getMyDetails;
