import UserService from "../services/userService.js";

const getUserDetails = async (req, res) => {
    const username = req.query?.username?.toLowerCase();
    const _id = req.query?.id;

    const userService = new UserService();

    if (_id) {
        var response = await userService.getUserDetails({ _id });
    } else {
        var response = await userService.getUserDetails({ username });
    }

    // Todo- If profile is !public, return response only if user is his friend by getting the requester's access token from header

    return res.status(200).json({
        message: "Details fetched successfully",
        data: response,
        success: true
    });
};

export default getUserDetails;
