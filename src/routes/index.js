import express from "express";
import {
    verifyToken,
    login,
    signup,
    update,
    deleteProfile,
    getUserDetails,
    noRouteController,
    getIdByUsername,
    isUsernameAvailable,
    autocompleteUsername,
    getUsernameById,
    getMyDetails
} from "../controllers/index.js";
import { errorMiddleware } from "../errors/errorMiddlewares/index.js";
import { asyncErrorHandler } from "../errors/errorUtils/index.js";
import googleWebLoginRouter from "./googleWebLoginRouter.js";
import resetPasswordRouter from "./resetPasswordRouter.js";

const router = express.Router();

router.get("/ping", (req, res) => {
    res.send({ pong: "Hello World!" });
});

router.post("/signup", asyncErrorHandler(signup));
router.post("/login", asyncErrorHandler(login));
router.get("/verify-token", verifyToken);
router.patch("/update", asyncErrorHandler(update));
router.delete("/delete", asyncErrorHandler(deleteProfile));
router.get("/user-details", asyncErrorHandler(getUserDetails));
router.get("/get-my-details", asyncErrorHandler(getMyDetails));
router.get("/get-id-by-username/:username", asyncErrorHandler(getIdByUsername));
// TODO Make this routes excluded from rate limitter as this will get polled very frequently
router.get(
    "/is-username-available/:username",
    asyncErrorHandler(isUsernameAvailable)
);

router.get("/get-username-by-id/:id", asyncErrorHandler(getUsernameById));

router.get(
    "/autocomplete-username/:username",
    asyncErrorHandler(autocompleteUsername)
);

router.use("/google-web-login", googleWebLoginRouter);
router.use("/reset-password", resetPasswordRouter);

router.all("*", noRouteController);

router.use(errorMiddleware);

export default router;
