import User from "../models/userModel.js";

class UserRepository {
    async create(data) {
        if (!data.location) {
            data.location = {
                type: "Point",
                coordinates: [0, 0] // Default to longitude: 0, latitude: 0 (e.g., Null Island)
            };
        }
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

    async findUsersInRectangle(ne, sw) {
        const users = await User.find({
            location: {
                $geoWithin: {
                    $box: [
                        [sw.lng, sw.lat], // Southwest corner
                        [ne.lng, ne.lat] // Northeast corner
                    ]
                }
            }
        }).select("username location avatar");
        return users;
    }
}

export default UserRepository;
