import UserService from "../services/userService.js";
import { validateUsername, validateEmail } from "../utils/index.js";
import { customError } from "../errors/errorUtils/index.js";

const update = async (req, res) => {
    const accessToken = req.headers["access-token"];
    if (!accessToken) {
        throw new customError(400, "Token is required");
    }
    const userService = new UserService();
    const tokenData = userService.verifyToken(accessToken);
    if (!tokenData) {
        throw new customError(400, "Invalid token");
    }

    const email = req.body.email?.toLowerCase();
    if (email) {
        validateEmail(email);
        // Checking if email already exists or not
        await userService.checkIfEmailExist(email);
    }
    const username = req.body.username?.toLowerCase();
    if (username) {
        validateUsername(username);
    }
    const password = req.body?.password;
    const discord_id = req.body?.discord_id;
    const name = req.body?.name;
    const location = req.body?.location;
    const totalFriends = req.body?.totalFriends;
    const isPublic = req.body?.isPublic;

    const dataToUpdate = {
        email,
        username,
        password,
        discord_id,
        name,
        location,
        totalFriends,
        isPublic
    };
    Object.keys(dataToUpdate).forEach((key) => {
        if (!dataToUpdate[key]) {
            delete dataToUpdate[key];
        }
    });

    const token = await userService.updateProfile(tokenData.id, dataToUpdate);
    return res.status(200).json({
        message: "Updated Successfully",
        data: { "access-token": token },
        success: true
    });
};

export default update;
