import UserService from "../../services/userService.js";

const getAvatarURL = async (req, res) => {
    const userId = req.params.id;
    const userService = new UserService();
    const response = await userService.getAvatarURL(userId);

    return res.status(200).json({
        message: "Details fetched successfully",
        data: response,
        success: true
    });
};

export default getAvatarURL;
