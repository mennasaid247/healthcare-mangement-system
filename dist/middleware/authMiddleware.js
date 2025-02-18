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
const jwt = __importStar(require("jsonwebtoken"));
const { JWT_SECRET = "" } = process.env;
const verifyToken = (req, res, next) => {
    const header = req.headers.authorization || req.headers.Authorization;
    if (!header) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    const token = typeof header === "string" ? header.split(" ")[1] : null; //34n klmt Bearer abl el token
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    try {
        const decode = jwt.verify(token, JWT_SECRET);
        if (!decode) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        // req[" currentUser"] = decode;
        req.user = decode;
        // req.body = { ...req.body, decode };
        // req.currentUser = decode;
        console.log('the decoded user:', req.user);
        next();
    }
    catch (error) {
        return res.status(400).json({ message: "token is unvalid" });
    }
};
module.exports = verifyToken;
