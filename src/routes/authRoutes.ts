import express, { Request, Response } from 'express';
const router = express.Router();
const { signup, login,resendOTP,verifyOTP,resetPassword } = require("../controllers/authController");

// endpoints for signup &login el howa yktb /login & /signup
//signup
router.post("/signup", signup);
//login
router.post("/login", login);
//resendOTP
router.post("/resendOTP", resendOTP);
//to verify the OTP
router.post('/verify', verifyOTP) ;
//reset password
router.post('/reset-password', resetPassword) ;

// module.exports = router;
// const verifyToken = require("../middleware/authMiddleware");




export default router;