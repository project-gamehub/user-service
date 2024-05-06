import ResetPasswordService from "../../services/resetPasswordService.js";
import { validateEmail, validatePassword } from "../../utils/index.js";

const resendOtp = async (req, res) => {
    const { email, password } = req.body;
    validateEmail(email);
    validatePassword(password);
    const resetPasswordService = new ResetPasswordService();
    const message = await resetPasswordService.resendOtp(email);

    return res.status(200).json({
        success: true,
        message
    });
};

export default resendOtp;
