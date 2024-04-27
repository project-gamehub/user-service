import usernamesList from "./usernamesList.js";

const generateRandomUsername = () => {
    const index = Math.floor(Math.random() * 83);
    const value = usernamesList[index];
    const randomNumber = Math.floor(Math.random() * 999) + 1;
    const username = value + randomNumber;
    return username;
};

export default generateRandomUsername;
