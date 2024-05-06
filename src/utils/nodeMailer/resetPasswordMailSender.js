import sendEmail from "./sendEmail.js";

const resetPasswordMailSender = async (receiverEmail, otp) => {
    // TODO - Make a good looking HTML and CSS for email
    const emailOptions = {
        from: "gamehub-reset-pass@gmail.com",
        to: receiverEmail,
        subject: "Reset OTP - GameHub",
        text: `OTP to reset GameHub's password is ${otp}. This will expire in 60 minutes.`
    };

    await sendEmail(emailOptions);
};

export default resetPasswordMailSender;
