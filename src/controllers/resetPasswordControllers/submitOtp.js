import customError from "../../errors/errorUtils/customError.js";
import ResetPasswordService from "../../services/resetPasswordService.js";
import { validateEmail, validatePassword } from "../../utils/index.js";

const submitOtp = async (req, res) => {
    const { email, password, otp } = req.body;
    validateEmail(email);
    validatePassword(password);
    if (!otp) {
        throw new customError(400, "OTP is required");
    }
    const resetPasswordService = new ResetPasswordService();
    const message = await resetPasswordService.submitOtp(email, password, otp);

    return res.status(200).json({
        success: true,
        message
    });
};

export default submitOtp;
