import { customError } from "../errors/errorUtils/index.js";
import ResetPasswordRepository from "../repository/resetPasswordRepository.js";
import { hashUsingBcrypt, randomOtpGenerator } from "../utils/index.js";
import UserService from "./userService.js";

class ResetPasswordService {
    constructor() {
        this.resetPasswordRepository = new ResetPasswordRepository();
        this.userService = new UserService();
    }

    async requestOtp(email) {
        // Check if user if present in the User DB or not
        const userWithEmailExist =
            await this.userService.checkIfEmailExist(email);

        // If not => Throw error
        if (!userWithEmailExist) {
            throw new customError(400, "No user found");
        }

        // Else Check if user is already present in the reset pass DB or not
        const emailExistInOtpDb = await this.resetPasswordRepository.getOtpData(
            { email }
        );
        if (emailExistInOtpDb) {
            return "OTP already requested";
        }

        // Else Generate a 4 digit OTP
        const otp = randomOtpGenerator();

        // encrypt the otp
        const encryptedOTP = hashUsingBcrypt(otp);

        // Store otp in DB
        this.resetPasswordRepository.create({
            email,
            otp: encryptedOTP
        });

        // send the mail with original OTP
        // TODO Setup nodemailer and submit the otp on the email

        return "OTP requested successfully";
    }

    async resendOtp(email) {
        // Check if user is already present in the reset pass DB or not
        // If not => Throw error
        // Check if last attempt time is atleat more than 60 seconds or not And
        // Request attempts is less than equal to 3 or not
        // If not throw error
        // Else generate new otp, requestAttempts++, lastRequestedTime = currTime, requestedAt and send the mail with decrypted OTP
    }

    async submitOtp(email, password, otp) {
        // Check if user is already present in the reset pass DB or not
        // If not => Throw error
        // Check if last attempt time is atleat more than 60 seconds or not And
        // Request attempts is less than equal to 3 or not
        // If not throw error
        // Else verify the otp and verifyAttempts++
        // If wrong OTP and throw error
        // else Update the users password and delete the doc from the db
    }
}

export default ResetPasswordService;
