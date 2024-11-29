import User from "../models/userModel.js";

class UserRepository {
    async create(data) {
        const user = await User.create(data);
        return user;
    }

    async update(specifierData, dataToUpdate) {
        const user = await User.findOneAndUpdate(specifierData, dataToUpdate, {
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

    async getUsers(inputUsername, getFields = "") {
        const users = await User.find(
            {
                username: { $regex: `${inputUsername}.*` }
            },
            getFields
        ).limit(5);
        return users;
    }

    async findNearbyUsers(lat, lng, radius) {
        const users = await User.find({
            location: {
                $near: {
                    $geometry: { type: "Point", coordinates: [lng, lat] },
                    $maxDistance: radius
                }
            }
        }).select("username location avatar");
        return users;
    }
}

export default UserRepository;
