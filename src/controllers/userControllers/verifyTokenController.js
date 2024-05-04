import UserService from "../../services/userService.js";
import { customError } from "../../errors/errorUtils/index.js";

const verifyToken = (req, res, next) => {
    try {
        const accessToken = req.headers["access-token"];
        const userService = new UserService();
        const response = userService.verifyToken(accessToken);

        return res.status(200).json({
            message: "User Authenticated",
            data: response.data,
            success: true
        });
    } catch (error) {
        if (error.name == "JsonWebTokenError") {
            throw new customError(400, "Invalid token");
        }
        if (error.name == "TokenExpiredError") {
            throw new customError(400, "Token Expired");
        }
        next(error);
    }
};

export default verifyToken;
