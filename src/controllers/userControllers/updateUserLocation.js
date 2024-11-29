import UserService from "../../services/userService.js";
import { customError } from "../../errors/errorUtils/index.js";

const updateUserLocation = async (req, res) => {
    const accessToken = req.headers["access-token"];
    if (!accessToken) {
        throw new customError(400, "Token is required");
    }
    const userService = new UserService();
    const userId = userService.verifyToken(accessToken)?.data.id;
    if (!userId) {
        throw new customError(400, "Invalid token");
    }

    const { lat, lng } = req.body.location;

    if (typeof lat !== "number" || typeof lng !== "number") {
        throw new customError(400, "Invalid location format");
    }

    const location = {
        type: "Point",
        coordinates: [lng, lat],
        lastUpdatedTime: new Date()
    };

    await userService.updateProfile({ _id: userId }, { location });

    return res.status(200).json({
        message: "Location updated successfully",
        success: true
    });
};

export default updateUserLocation;
