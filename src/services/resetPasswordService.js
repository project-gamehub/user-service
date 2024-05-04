import ResetPasswordRepository from "../repository/resetPasswordRepository.js";

class ResetPasswordService {
    constructor() {
        this.resetPasswordRepository = new ResetPasswordRepository();
    }

    async requestOtp(email, password) {
        // Validate email and pass
        // Check if user if present in the User DB or not
        // If not => Throw error
        // Else Check if user is already present in the reset pass DB or not
        // If present => Throw error
        // Else Generate a 4 digit OTP
        // encrypt the otp and Store it in DB and send the mail with original OTP
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
        // Validate email and pass
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
