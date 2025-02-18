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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPassword = exports.verifyOTP = exports.resendOTP = exports.login = exports.signup = void 0;
const yup = __importStar(require("yup"));
const User_1 = require("../models/User");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const validationSchema_1 = require("../validations/validationSchema");
const encrypt_1 = require("../helper/encrypt");
const generateOTP = require('../services/otp.generator');
const { sendEmail } = require('../services/nodemailer');
const signup = async (req, res) => {
    try {
        await validationSchema_1.signupSchema.validate(req.body, { abortEarly: false });
        const { firstName, lastName, email, phonenumber, address, nationalNumber, FathernationalNumber, MothernationalNumber, password, confirmPassword, gender, birthDate, height, weight, foodAllergy, motherDisease, fatherDisease, bloodGroup } = req.body;
        const existingUser = await User_1.User.findOne({
            where: [{ email }, { phonenumber }, { nationalNumber }]
        });
        if (existingUser) { // 3yza if phone no and national no already exist
            return res.status(400).json({ message: 'This account already exists' });
        }
        const otp = generateOTP();
        const hashedPassword = await bcryptjs_1.default.hash(password, 10);
        const user = new User_1.User();
        user.firstName = firstName;
        user.lastName = lastName;
        user.email = email;
        user.phonenumber = phonenumber;
        user.address = address;
        user.nationalNumber = nationalNumber;
        user.FathernationalNumber = FathernationalNumber;
        user.MothernationalNumber = MothernationalNumber;
        user.password = hashedPassword;
        user.confirmPassword = hashedPassword;
        user.gender = gender;
        user.birthDate = new Date(birthDate);
        user.height = parseInt(height);
        user.weight = parseInt(weight);
        user.Allergy = foodAllergy ? [foodAllergy] : [];
        user.motherDisease = motherDisease ? [motherDisease] : [];
        user.fatherDisease = fatherDisease ? [fatherDisease] : [];
        user.bloodType = bloodGroup;
        user.otp_code = otp;
        user.otp_expiration = new Date(Date.now() + 10 * 60 * 1000);
        user.is_verified = false;
        const subject = 'Email Verification';
        const message = `Your OTP code is: ${otp}.This code will expire in 10 minutes.`;
        sendEmail(user.email, subject, message);
        await user.save();
        return res.status(201).json({ message: `User created successfully with username ${firstName}` });
    }
    catch (error) {
        if (error instanceof yup.ValidationError) {
            console.error('Validation Error aresss:', error.errors);
            return res.status(400).json({ errors: error.errors });
        }
        console.error('Internal Server Error:', error);
        const err = error;
        return res.status(500).json({ message: 'Internal server error', error: err.message });
    }
};
exports.signup = signup;
const login = async (req, res) => {
    try {
        await validationSchema_1.loginSchema.validate(req.body, { abortEarly: false });
        const { email, password, phonenumber } = req.body;
        if (!email && !phonenumber) {
            return res.status(400).json({ message: 'Please enter email or phonenumber' });
        }
        if (email) {
            //check if valid format
            const firstUser = await User_1.User.findOneBy({ email });
            if (!firstUser) {
                {
                    return res.status(400).json({ message: 'Invalid email or password' });
                }
            }
            const isPasswordValid = encrypt_1.encrypt.comparepassword(firstUser.password, password);
            if (!isPasswordValid) {
                {
                    return res.status(401).json({ message: 'Invalid email or password' });
                }
            }
            const token = encrypt_1.encrypt.generateToken({ name: firstUser.firstName.concat(firstUser.lastName), email: firstUser.email, role: firstUser.role });
            return res.status(200).header("auth-token", token).json({ message: 'Loggedin successfully', token });
            // return res.status(200).json({ message: 'Loggedin successfully',token });
        }
        else if (phonenumber) {
            const firstUser = await User_1.User.findOneBy({ phonenumber });
            // const firstUser = await User.findOne({ where: { phonenumber:req.body.phonenumber} });
            if (!firstUser) {
                {
                    return res.status(400).json({ message: 'Invalid email or password' });
                }
            }
            const isPasswordValid = encrypt_1.encrypt.comparepassword(firstUser.password, password);
            if (!isPasswordValid) {
                {
                    return res.status(401).json({ message: 'Invalid email or password' });
                }
            }
            const token = encrypt_1.encrypt.generateToken({ name: firstUser.firstName.concat(firstUser.lastName), email: firstUser.email, role: firstUser.role });
            return res.status(200).header("auth-token", token).json({ message: 'Loggedin successfully', token });
        }
    }
    catch (error) {
        if (error instanceof yup.ValidationError) {
            console.error('Validation Error:', error.errors);
            return res.status(400).json({ errors: error.errors });
        }
        console.error('Internal Server Error:', error);
    }
};
exports.login = login;
const resendOTP = async (req, res) => {
    try {
        const { email } = req.body;
        const newOTP = generateOTP();
        const firstUser = await User_1.User.findOneBy({ email });
        if (!firstUser) {
            {
                return res.status(400).json({ message: 'Invalid email' });
            }
        }
        firstUser.otp_code = newOTP;
        firstUser.otp_expiration = new Date(Date.now() + 10 * 60 * 1000);
        // console.log('new otp:',firstUser.otp_code);
        // console .log('new otp expiration :',firstUser.otp_expiration);
        //  lazem to be saved in the db
        await firstUser.save();
        const subject = 'Email Verification';
        const message = `Your OTP code is: ${newOTP}`;
        sendEmail(email, subject, message);
        return res.status(200).json({ message: 'OTP is resent successfully', firstUser });
    }
    catch (error) {
        const err = error;
        return res.status(500).json({ message: 'Internal server error', error: err.message });
    }
};
exports.resendOTP = resendOTP;
const verifyOTP = async (req, res) => {
    try {
        const { email, otp } = req.body;
        const firstUser = await User_1.User.findOneBy({ email });
        if (!firstUser) {
            {
                return res.status(400).json({ message: 'Invalid email' });
            }
        }
        if (firstUser.otp_expiration && firstUser.otp_expiration < new Date()) {
            return res.status(400).json({ message: 'OTP is expired , please click on resend email' });
        }
        if (firstUser.otp_code === otp && firstUser.otp_expiration && firstUser.otp_expiration > new Date()) {
            firstUser.is_verified = true;
            await firstUser.save();
            //generate token to be logged in automatically
            const token = encrypt_1.encrypt.generateToken({ name: firstUser.firstName.concat(firstUser.lastName), email: firstUser.email, role: firstUser.role });
            return res.status(200).header("auth-token", token).json({ message: 'Email is verified successfully', firstUser });
        }
    }
    catch (error) {
        const err = error;
        return res.status(500).json({ message: 'Internal server error', error: err.message });
    }
};
exports.verifyOTP = verifyOTP;
const resetPassword = async (req, res) => {
    const { email, password, confirmPassword } = req.body;
    try {
        const firstUser = await User_1.User.findOneBy({ email });
        if (!firstUser) {
            {
                return res.status(400).json({ message: 'Invalid email' });
            }
        }
        if (password !== confirmPassword) {
            {
                return res.status(400).json({ message: 'Passwords must match' });
            }
        }
        const hashedPassword = await bcryptjs_1.default.hash(password, 10);
        firstUser.password = hashedPassword;
        firstUser.confirmPassword = hashedPassword;
        await firstUser.save();
        const token = encrypt_1.encrypt.generateToken({ name: firstUser.firstName.concat(firstUser.lastName), email: firstUser.email, role: firstUser.role });
        return res.status(200).header("auth-token", token).json({ message: 'Password is reset successfully', firstUser });
    }
    catch (error) {
        const err = error;
        return res.status(500).json({ message: 'Internal server error', error: err.message });
    }
};
exports.resetPassword = resetPassword;
