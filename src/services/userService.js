import UserRepository from "../repository/userRepository.js";
import { SALTROUNDS, JWT_SECRET_KEY } from "../config/index.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { customError } from "../errors/errorUtils/index.js";

class UserService {
    constructor() {
        this.userRepository = new UserRepository();
    }

    async signup(data) {
        // Hashing the password
        if (data.password) {
            data.password = bcrypt.hashSync(
                data.password,
                parseInt(SALTROUNDS)
            );
        }
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
            throw new customError(400, "Please check you email or username");
        }
        const checkPass = this.checkPassword(plainPass, user.password);
        if (!checkPass) {
            throw new customError(400, "Please check you password");
        }
        const token = this.createToken({
            id: user.id,
            username: user.username
        });
        return token;
    }

    async updateProfile(id, data) {
        // Hashing the password
        if (data.password) {
            data.password = bcrypt.hashSync(
                data.password,
                parseInt(SALTROUNDS)
            );
        }
        const user = await this.userRepository.update(id, data);
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

    async getUserDetails(data) {
        const user = await this.userRepository.getOneByData(
            data,
            "name location _id username totalFriends isPublic"
        );
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
            "username -_id"
        );
        users = users.map((user) => user.username);
        return users;
    }

    createToken(data) {
        const token = jwt.sign({ data }, JWT_SECRET_KEY, {
            expiresIn: "7d"
        });
        return token;
    }

    verifyToken(token) {
        const data = jwt.verify(token, JWT_SECRET_KEY);
        return data;
    }

    checkPassword(userInputPass, encryptedPass) {
        return bcrypt.compareSync(userInputPass, encryptedPass);
    }

    async checkIfEmailExist(email) {
        const user = await this.userRepository.getOneByData({
            email
        });
        if (user) {
            throw new customError(400, "Email Already Exists");
        }
    }
}

export default UserService;
