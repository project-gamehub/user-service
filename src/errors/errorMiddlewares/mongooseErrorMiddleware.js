import { customError } from "../errorUtils/index.js";

const mongooseError = (err, doc, next) => {
    if (err.code === 11000 && err.keyPattern.username) {
        next(new customError(400, "Username is already in use"));
    } else if (err.name == "CastError") {
        next(new customError(400, `Invalid ${err.path}`));
    }
    next();
};

export default mongooseError;
