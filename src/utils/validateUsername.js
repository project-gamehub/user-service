import { customError } from "../errors/errorUtils/index.js";

const validateUsername = (username) => {
    if (!username) {
        throw new customError(400, "Username is required");
    } else if (username.length < 3) {
        throw new customError(400, "Username length must be greater than 3");
    } else if (username.length > 15) {
        throw new customError(400, "Username length must be smaller than 15");
    }

    const usernameRegex = /^[a-z0-9_\.]+$/;
    if (!usernameRegex.test(username)) {
        throw new customError(400, "Please provide a valid username");
    }
};

export default validateUsername;
