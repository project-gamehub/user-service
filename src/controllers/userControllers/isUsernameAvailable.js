import UserService from "../../services/userService.js";

const isUsernameAvailable = async (req, res) => {
    const username = req.params.username.toLowerCase();
    const userService = new UserService();
    const isAvailable = await userService.isUsernameAvailable(username);

    return res.status(200).json({
        message: isAvailable ? "Username available" : "Username unavailable",
        data: isAvailable,
        success: true
    });
};

export default isUsernameAvailable;
