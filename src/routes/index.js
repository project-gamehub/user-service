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
    getMyDetails,
    getAvatarURL,
    uploadImage
} from "../controllers/index.js";
import { errorMiddleware } from "../errors/errorMiddlewares/index.js";
import { asyncErrorHandler } from "../errors/errorUtils/index.js";
import googleWebLoginRouter from "./googleWebLoginRouter.js";
import resetPasswordRouter from "./resetPasswordRouter.js";
import multerConfig from "../utils/multerConfig.js";

const router = express.Router();

router.get("/ping", (_, res) => {
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
router.get(
    "/is-username-available/:username",
    asyncErrorHandler(isUsernameAvailable)
);

router.post(
    "/upload-image",
    multerConfig.single("image"),
    asyncErrorHandler(uploadImage)
);

router.get("/get-username-by-id/:id", asyncErrorHandler(getUsernameById));
router.get("/get-avatar-url/:id", asyncErrorHandler(getAvatarURL));

router.get(
    "/autocomplete-username/:username",
    asyncErrorHandler(autocompleteUsername)
);

router.use("/google-web-login", googleWebLoginRouter);
router.use("/reset-password", resetPasswordRouter);

router.all("*", noRouteController);

router.use(errorMiddleware);

export default router;
