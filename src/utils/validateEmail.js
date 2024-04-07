import { customError } from "../errors/errorUtils/index.js";

const validateEmail = (email) => {
    const emailRegex = /^[^\.\s][\w\-\.{2,}]+@([\w-]+\.)+[\w-]{2,}$/;
    if (!emailRegex.test(email)) {
        throw new customError(400, "Please provide a valid Email");
    }
};

export default validateEmail;
