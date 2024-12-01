import UserService from "../../services/userService.js";
import { customError } from "../../errors/errorUtils/index.js";
import calculateDistance from "../../utils/calculateDistance.js";

const getNearbyUsers = async (req, res) => {
    const accessToken = req.headers["access-token"];
    if (!accessToken) {
        throw new customError(400, "Token is required");
    }
    const userService = new UserService();
    const userId = userService.verifyToken(accessToken)?.data.id;
    if (!userId) {
        throw new customError(400, "Invalid token");
    }

    const points = req.body?.points;

    if (!points) {
        throw new customError(400, "Points are required");
    }

    const ne = points?.ne;
    const sw = points?.sw;

    if (!ne || !sw) {
        throw new customError(400, "Points are required");
    }

    let neLat = ne?.lat;
    let neLng = ne?.lng;
    let swLng = sw?.lng;
    let swLat = sw?.lat;

    if (!neLat || !neLng || !swLng || !swLat) {
        throw new customError(400, "Latitude and Longitude is required");
    }

    neLat = parseFloat(neLat);
    neLng = parseFloat(neLng);
    swLng = parseFloat(swLng);
    swLat = parseFloat(swLat);

    if (!neLat || !neLng || !swLng || !swLat || typeof neLat !== "number" || typeof neLng !== "number" || typeof swLng !== "number" || typeof swLat !== "number") {
        throw new customError(400, "Invalid location format");
    }

    const distInKM = calculateDistance(ne, sw);

    if (distInKM > 10) {
        throw new customError(400, "Too much area to return users");
    }

    const nearbyUsers = await userService.getNearbyUsersInRectangle(
        { lat: neLat, lng: neLng },
        { lat: swLat, lng: swLng }
    );
    return res.status(200).json({
        message: "Nearby users fetched successfully",
        success: true,
        users: nearbyUsers
    });
};

export default getNearbyUsers;
