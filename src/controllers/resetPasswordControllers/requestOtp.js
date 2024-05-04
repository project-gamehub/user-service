import ResetPasswordService from "../../services/resetPasswordService.js";

const requestOtp = async (req, res) => {
    const { email, password } = req.body;
    console.log("email is: ", email);
    console.log("pass is: ", password);
    const resetPasswordService = new ResetPasswordService();
    // const isAvailable = await userService.autocompleteUsername(username);

    return res.status(200).json({
        // message: isAvailable ? "Username available" : "Username unavailable",
        // data: isAvailable,
        success: true
    });
};

export default requestOtp;
