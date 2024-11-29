import UserRepository from "../repository/userRepository.js";
import {
    CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET,
    CLOUDINARY_CLOUD_NAME,
    JWT_SECRET_KEY
} from "../config/index.js";
import jwt from "jsonwebtoken";
import { customError } from "../errors/errorUtils/index.js";
import {
    compareBcryptHash,
    generateRandomUsername,
    hashUsingBcrypt
} from "../utils/index.js";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

class UserService {
    constructor() {
        this.userRepository = new UserRepository();
    }

    async signup(data) {
        // Hashing the password
        data.password = hashUsingBcrypt(data.password);
        const user = await this.userRepository.create(data);
        return user;
    }

    async login(username, email, plainPass) {
        if (username) {
            var user = await this.userRepository.getOneByData({ username });
        } else {
            var user = await this.userRepository.getOneByData({ email });
        }
        if (!user) {
            throw new customError(400, "No user found");
        }
        if (!user.password) {
            throw new customError(400, "Passwords don't match");
        }
        const checkPass = this.checkPassword(plainPass, user.password);
        if (!checkPass) {
            throw new customError(400, "Wrong Password");
        }
        const token = this.createToken({
            id: user.id,
            username: user.username
        });
        return token;
    }

    async updateProfile(specifierData, data) {
        // Hashing the password
        if (data.password) {
            data.password = hashUsingBcrypt(data.password);
        }
        const user = await this.userRepository.update(specifierData, data);
        if (!user) {
            throw new customError(400, "No user found!");
        }

        if (data.username) {
            const token = this.createToken({
                id: user.id,
                username: user.username
            });
            return token;
        }
    }

    async deleteProfile(id, plainPass) {
        const user = await this.userRepository.getOneByData({ _id: id });
        if (!user) {
            throw new customError(400, "No user found");
        }
        const checkPass = this.checkPassword(plainPass, user.password);
        if (!checkPass) {
            throw new customError(400, "Please check you password");
        }
        const response = this.userRepository.delete(id);
        return response;
    }

    async getUserDetails(
        data,
        fields = "name location _id username totalFriends isPublic"
    ) {
        const user = await this.userRepository.getOneByData(data, fields);
        if (!user) {
            throw new customError(400, "No user found");
        }
        return user;
    }

    async getIdByUsername(username) {
        const user = await this.userRepository.getOneByData(
            { username },
            "_id"
        );
        if (!user) {
            throw new customError(400, "No user found");
        }
        return user;
    }

    async getAvatarURL(userId) {
        const user = await this.userRepository.getOneByData(
            { _id: userId },
            "avatar"
        );
        if (!user) {
            throw new customError(400, "No user found");
        }
        return user;
    }

    async isUsernameAvailable(username) {
        const user = await this.userRepository.getOneByData(
            { username },
            "username -_id"
        );
        if (!user) {
            return true;
        }
        return false;
    }

    async autocompleteUsername(username) {
        let users = await this.userRepository.getUsers(
            username,
            "username avatar"
        );
        return users;
    }

    // UserId and username as data in the token
    // TODO- Change this to jwt.sign({ data }, JWT_SECRET_KEY, {
    //     expiresIn: "7d"
    // });
    createToken(data) {
        const token = jwt.sign({ data }, JWT_SECRET_KEY);
        return token;
    }

    verifyToken(token) {
        const data = jwt.verify(token, JWT_SECRET_KEY);
        return data;
    }

    checkPassword(userInputPass, encryptedPass) {
        return compareBcryptHash(userInputPass, encryptedPass);
    }

    async checkIfEmailExist(email) {
        const user = await this.userRepository.getOneByData({
            email
        });
        if (user) {
            return true;
        }
        return false;
    }

    async handleGoogleUser(name, picture, email) {
        // Check if user is already registered or not by email
        // If not reg, sign up user. Generate random username to signup
        // create a token and return the token
        let user = await this.userRepository.getOneByData({ email });
        if (!user) {
            let username = generateRandomUsername();
            while (!(await this.isUsernameAvailable(username))) {
                username = generateRandomUsername();
            }
            user = await this.signup({
                email,
                name,
                avatar: picture,
                isGoogleLogin: true,
                username
            });
        }

        const token = this.createToken({
            id: user._id,
            username: user.username
        });
        return token;
    }

    async uploadProfileImage(file, userId) {
        cloudinary.config({
            cloud_name: CLOUDINARY_CLOUD_NAME,
            api_key: CLOUDINARY_API_KEY,
            api_secret: CLOUDINARY_API_SECRET
        });

        const cloudinaryResponse = await cloudinary.uploader.upload(file.path, {
            public_id: `gamehub_profile_images/${userId}`,
            overwrite: true,
            resource_type: "image"
        });

        await this.userRepository.update(
            { _id: userId },
            { avatar: cloudinaryResponse.secure_url }
        );

        fs.unlinkSync(file.path);
        return cloudinaryResponse.secure_url;
    }

    async getNearbyUsers(lat, lng) {
        const radiusInMeters = 10000;
        const users = await this.userRepository.findNearbyUsers(
            lat,
            lng,
            radiusInMeters
        );
        return users;
    }
}

export default UserService;
