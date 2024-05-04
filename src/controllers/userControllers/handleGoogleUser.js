import UserService from "../../services/userService.js";

const handleGoogleUser = async (profile) => {
    const { name, picture, email } = profile;
    const userService = new UserService();
    const token = await userService.handleGoogleUser(name, picture, email);
    return token;
};

export default handleGoogleUser;
