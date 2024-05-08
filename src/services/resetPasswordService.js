import axios from "axios";
import { customError } from "../errors/errorUtils/index.js";
import UserService from "./userService.js";
import { OTP_SERVICE_URL } from "../config/index.js";

class ResetPasswordService {
    constructor() {
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
        try {
            const response = await axios.get(
                OTP_SERVICE_URL + "/get-otp-data/" + email
            );
            const emailExistInOtpDb = response?.data?.data;
            if (emailExistInOtpDb) {
                return "OTP already requested";
            }
        } catch (error) {
            console.log("Error occured while contacting server");
        }

        axios.post(OTP_SERVICE_URL + "/send-otp", { email }).catch((e) => {
            console.log("Error sending OTP");
        });
        return "OTP requested successfully";
    }

    async resendOtp(email) {
        // Check if user is already present in the reset pass DB or not
        let userWithEmailExist;
        try {
            const response = await axios.get(
                OTP_SERVICE_URL + "/get-otp-data/" + email
            );
            userWithEmailExist = response?.data?.data;
        } catch (error) {
            console.log("Error occured while contacting server");
        }

        // If not => Throw error
        if (!userWithEmailExist) {
            throw new customError(400, "OTP not requested");
        }

        // Check if last attempt time is atleat more than 60 seconds or not And
        if (
            Date.now() - Date.parse(userWithEmailExist.lastRequestedTime) <
            60000
        ) {
            throw new customError(
                400,
                "Please wait atleast 60 seconds before requesting new OTP"
            );
        }

        // Request attempts is less than 3 or not
        // If not throw error
        if (userWithEmailExist.requestAttempts > 3) {
            throw new customError(
                400,
                "Maximum amount of requests reached. Please try after 1hr"
            );
        }

        // Send the OTP
        axios.post(OTP_SERVICE_URL + "/resend-otp", { email }).catch((e) => {
            console.log("Error sending OTP");
        });

        return "OTP resent successfully";
    }

    async submitOtp(email, password, otp) {
        // Check if user is already present in the reset pass DB or not
        let userWithEmailExist;
        try {
            const response = await axios.get(
                OTP_SERVICE_URL + "/get-otp-data/" + email
            );
            userWithEmailExist = response?.data?.data;
        } catch (error) {
            console.log("Error occured while contacting server");
        }

        // If not => Throw error
        if (!userWithEmailExist) {
            throw new customError(400, "OTP not requested");
        }

        // Check if submit attempts is less than equal to 3 or not
        if (userWithEmailExist.verifyAttempts > 3) {
            throw new customError(
                400,
                "Maximum amount of tries reached. Please try after 1hr"
            );
        }

        // verify the otp
        let isCorrectOtp;
        try {
            const response = await axios.post(OTP_SERVICE_URL + "/verify-otp", {
                email,
                otp
            });
            isCorrectOtp = response?.data?.isCorrectOtp;
        } catch (error) {
            console.log("Error occured while verifying otp");
        }
        if (!isCorrectOtp) {
            throw new customError(400, "Wrong OTP, please try again");
        }

        // // else Update the users password
        await this.userService.updateProfile({ email }, { password });

        // // delete the doc from the db
        axios
            .delete(OTP_SERVICE_URL + "/delete-otp-data/" + email)
            .catch((e) => {
                console.log("Error deleting OTP Data");
            });

        return "Password updated successfully";
    }
}

export default ResetPasswordService;
