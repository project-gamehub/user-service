import fs from "fs";
import path from "path";

// Function to delete old files
const deleteOldFiles = (directory, maxAgeInMs) => {
    const currentTime = Date.now();

    fs.readdir(directory, (err, files) => {
        if (err) {
            console.error("Error reading directory:", err);
            return;
        }

        files.forEach((file) => {
            const filePath = path.join(directory, file);

            // Extract the timestamp from the file name
            const timestamp = parseInt(file.split("-")[0], 10);

            // If the timestamp is valid and the file is older than the max age, delete it
            if (!isNaN(timestamp) && currentTime - timestamp > maxAgeInMs) {
                fs.unlink(filePath, (err) => {
                    if (err) {
                        console.error(`Error deleting file ${filePath}:`, err);
                    } else {
                        console.log(`Deleted old file: ${filePath}`);
                    }
                });
            }
        });
    });
};

export default deleteOldFiles;