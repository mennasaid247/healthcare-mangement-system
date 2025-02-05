"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.encrypt = void 0;
const bcrypt = __importStar(require("bcrypt"));
const jwt = __importStar(require("jsonwebtoken"));
// import { JWT_SECRET } from "../config";
require('dotenv').config();
// const JWT_SECRET = process.env.JWT_SECRET || 'secret';
const { JWT_SECRET = "" } = process.env;
class encrypt {
    static async encryptpass(password) {
        return bcrypt.hashSync(password, 12);
    }
    static comparepassword(hashPassword, password) {
        return bcrypt.compareSync(password, hashPassword);
    }
    static generateToken(payload) {
        return jwt.sign(payload, JWT_SECRET, { expiresIn: "2m" });
    }
}
exports.encrypt = encrypt;
