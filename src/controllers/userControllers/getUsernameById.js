import UserService from "../../services/userService.js";

const getUsernameById = async (req, res) => {
    const _id = req.params.id;
    const userService = new UserService();
    const response = await userService.getUserDetails({ _id }, "username -_id");

    return res.status(200).json({
        message: "Username fetched successfully",
        data: response,
        success: true
    });
};

export default getUsernameById;
