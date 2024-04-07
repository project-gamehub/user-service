import UserService from "../services/userService.js";
import { customError } from "../errors/errorUtils/index.js";

const getIdByUsername = async (req, res) => {
    const username = req.params?.username?.toLowerCase();
    if (!username) {
        throw new customError(400, "Username is required");
    }
    const userService = new UserService();
    const response = await userService.getIdByUsername(username);

    return res.status(200).json({
        message: "Details fetched successfully",
        data: response,
        success: true
    });
};

export default getIdByUsername;
