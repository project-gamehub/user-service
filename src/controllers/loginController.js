import UserService from "../services/userService.js";
import { customError } from "../errors/errorUtils/index.js";
import validatePassword from "../utils/validatePassword.js";

const login = async (req, res) => {
    const email = req.body.email?.toLowerCase();
    const username = req.body.username?.toLowerCase();
    const password = req.body.password;
    if (!(email || username)) {
        throw new customError(400, "Email or Username is required");
    }
    validatePassword(password);

    const userService = new UserService();
    const response = await userService.login(username, email, password);

    return res.status(200).json({
        message: "Logged In Successfully",
        data: {
            "access-token": response
        },
        success: true
    });
};

export default login;
