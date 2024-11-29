import signup from "./userControllers/signupController.js";
import login from "./userControllers/loginController.js";
import verifyToken from "./userControllers/verifyTokenController.js";
import update from "./userControllers/updateController.js";
import deleteProfile from "./userControllers/deleteController.js";
import getUserDetails from "./userControllers/getUserDetailsController.js";
import noRouteController from "./noRouteController.js";
import getIdByUsername from "./userControllers/getIdByUsername.js";
import isUsernameAvailable from "./userControllers/isUsernameAvailable.js";
import autocompleteUsername from "./userControllers/autocompleteUsername.js";
import getUsernameById from "./userControllers/getUsernameById.js";
import handleGoogleUser from "./userControllers/handleGoogleUser.js";
import getMyDetails from "./userControllers/getMyDetails.js";
import requestOtp from "./resetPasswordControllers/requestOtp.js";
import resendOtp from "./resetPasswordControllers/resendOtp.js";
import submitOtp from "./resetPasswordControllers/submitOtp.js";
import getAvatarURL from "./userControllers/getAvatarURL.js";
import uploadImage from "./userControllers/uploadImage.js";
import updateUserLocation from "./userControllers/updateUserLocation.js";

export {
    signup,
    login,
    verifyToken,
    update,
    deleteProfile,
    getUserDetails,
    noRouteController,
    getIdByUsername,
    isUsernameAvailable,
    autocompleteUsername,
    getUsernameById,
    handleGoogleUser,
    getMyDetails,
    requestOtp,
    resendOtp,
    submitOtp,
    getAvatarURL,
    uploadImage,
    updateUserLocation
};
