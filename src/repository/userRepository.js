import User from "../models/userModel.js";

class UserRepository {
    async create(data) {
        const user = await User.create(data);
        return user;
    }

    async update(id, dataToUpdate) {
        const user = await User.findOneAndUpdate({ id }, dataToUpdate, {
            new: true
        });
        return user;
    }

    async delete(id) {
        const user = await User.findByIdAndDelete(id);
        return user;
    }

    async getOneByData(data, getFields = "") {
        const user = await User.findOne(data, getFields);
        return user;
    }
}

export default UserRepository;
