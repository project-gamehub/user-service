import { customError } from "../errors/errorUtils/index.js";

const validatePassword = (password) => {
    if (!password || password.length < 8) {
        throw new customError(400, "Invalid Password");
    }
};

export default validatePassword;
