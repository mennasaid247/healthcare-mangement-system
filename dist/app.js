"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = require("./data-source");
// import { Routes } from "./routes"
const User_1 = require("./models/User");
const gender_1 = require("./enum/gender"); // Import Gender enum
class Application {
    static async main() {
        //establish connection to the database
        await data_source_1.AppDataSource.initialize();
        const user = new User_1.User();
        user.firstName = "Timber";
        user.lastName = "Saw";
        user.email = "timber23@example.com";
        user.phonenumber = "09234578690";
        user.address = "1234 Elm Street";
        user.nationalNumber = "12345678965432";
        user.password = "Psasowrd123@";
        user.confirmPassword = "Psasowrd123@";
        user.gender = gender_1.gender.MALE;
        user.birthDate = new Date("1999-12-12");
        user.weight = 80;
        user.height = 180;
        try {
            await user.save();
            console.log("User saved successfully");
        }
        catch (error) {
            console.log("Error saving user", error);
        }
    }
}
exports.default = Application;
