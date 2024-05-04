import resetPassword from "../models/resetPasswordModel.js";

class resetPasswordRepository {
    async create(data) {
        const otpData = await resetPassword.create(data);
        return otpData;
    }

    async update(specifierData, dataToUpdate) {
        const newOtpData = await resetPassword.findOneAndUpdate(
            specifierData,
            dataToUpdate,
            { new: true }
        );
        return newOtpData;
    }

    async getOtpData(specifierData, getFields = "") {
        const otpData = await resetPassword.findOne(specifierData, getFields);
        return otpData;
    }
}

export default resetPasswordRepository;
