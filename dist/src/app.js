"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = require("./data-source");
const User_1 = require("./models/User");
const gender_1 = require("./enum/gender");
class Application {
    static main() {
        return __awaiter(this, void 0, void 0, function* () {
            yield data_source_1.AppDataSource.initialize();
            const user = new User_1.User();
            user.firstName = "Timber";
            user.lastName = "Saw";
            user.email = "timber23@example.com";
            user.phonenumber = "999234567890";
            user.address = "1234 Elm Street";
            user.nationalNumber = "12345678965432";
            user.password = "Psasowrd123@";
            user.confirmPassword = "Psasowrd123@";
            user.gender = gender_1.gender.MALE;
            user.birthDate = new Date("1999-12-12");
            user.weight = 80;
            user.height = 180;
            try {
                yield user.save();
                console.log("User saved successfully");
            }
            catch (error) {
                console.log("Error saving user", error);
            }
        });
    }
}
exports.default = Application;
//# sourceMappingURL=app.js.map