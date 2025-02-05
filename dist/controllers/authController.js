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
exports.login = exports.signup = void 0;
// import { Request, Response } from 'express';
const yup = __importStar(require("yup"));
const User_1 = require("../models/User");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const validationSchema_1 = require("../validations/validationSchema");
const encrypt_1 = require("../helper/encrypt");
const signup = async (req, res) => {
    try {
        await validationSchema_1.signupSchema.validate(req.body, { abortEarly: false });
        const { firstName, lastName, email, phonenumber, address, nationalNumber, FathernationalNumber, MothernationalNumber, password, confirmPassword, gender, birthDate, height, weight, foodAllergy, motherDisease, fatherDisease, bloodGroup } = req.body;
        const existingUser = await User_1.User.findOne({
            where: [
                { email },
                { phonenumber },
                { nationalNumber }
            ]
        });
        if (existingUser) { // 3yza if phone no and national no already exist
            return res.status(400).json({ message: 'This account already exists' });
        }
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
        await user.save();
        return res.status(201).json({ message: `User created successfully with username ${firstName}` });
    }
    catch (error) {
        if (error instanceof yup.ValidationError) {
            console.error('Validation Error:', error.errors);
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
        const { email, password } = req.body;
        if (!email) {
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
    }
    catch (error) {
        if (error instanceof yup.ValidationError) {
            console.error('Validation Error:', error.errors);
            return res.status(400).json({ errors: error.errors });
        }
        console.error('Internal Server Error:', error);
        const err = error;
        return res.status(500).json({ message: 'Internal server error', error: err.message });
    }
    // const user = await User.findOne({
    //   where: [
    //   { email },
    //   { phonenumber }]});
    // }
    // catch (error) { 
    //   // console.error('Internal Server Error:', error);
    //   const err = error as any;
    // return res.status(500).json({ message: 'Internal server error', error: err.message });
    // }
};
exports.login = login;
