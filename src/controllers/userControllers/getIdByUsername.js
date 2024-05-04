import UserService from "../../services/userService.js";

const getIdByUsername = async (req, res) => {
    const username = req.params.username.toLowerCase();
    const userService = new UserService();
    const response = await userService.getIdByUsername(username);

    return res.status(200).json({
        message: "Details fetched successfully",
        data: response,
        success: true
    });
};

export default getIdByUsername;
