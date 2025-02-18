"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const { signup, login, resendOTP, verifyOTP, resetPassword } = require("../controllers/authController");
// endpoints for signup &login el howa yktb /login & /signup
//signup
router.post("/signup", signup);
//login
router.post("/login", login);
//resendOTP
router.post("/resendOTP", resendOTP);
//to verify the OTP
router.post('/verify', verifyOTP);
//reset password
router.post('/reset-password', resetPassword);
// module.exports = router;
// const verifyToken = require("../middleware/authMiddleware");
exports.default = router;
