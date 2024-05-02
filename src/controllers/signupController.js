import UserService from "../services/userService.js";
import {
    validateUsername,
    validateEmail,
    validatePassword
} from "../utils/index.js";
import { customError } from "../errors/errorUtils/index.js";

const signup = async (req, res) => {
    const email = req.body?.email?.toLowerCase();
    const username = req.body?.username?.toLowerCase();
    const password = req.body?.password;

    validatePassword(password);
    validateEmail(email);
    validateUsername(username);

    const userService = new UserService();

    // Checking if email already exists or not
    await userService.checkIfEmailExist(email);
    // Check if username is available or not
    if (!(await userService.isUsernameAvailable(username))) {
        throw new customError(400, "Username is already in use");
    }

    const response = await userService.signup({
        email,
        password,
        username
    });

    const token = userService.createToken({
        id: response.id,
        username: response.username
    });

    return res.status(201).json({
        message: "Account Created Successfully",
        data: { "access-token": token },
        success: true
    });
};

export default signup;
