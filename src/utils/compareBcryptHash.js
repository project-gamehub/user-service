import bcrypt from "bcrypt";

const compareBcryptHash = (userInputPass, encryptedPass) => {
    return bcrypt.compareSync(userInputPass, encryptedPass);
};
export default compareBcryptHash;
