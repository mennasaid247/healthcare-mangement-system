"use strict";
// import * as yup from 'yup';
// export const signupSchema = yup.object().shape({
//     firstName: yup.string().required('First name is required'),
//     lastName: yup.string().required('Last name is required'),
//     email: yup.string().email('Invalid email format').required('Email is required'),
//     phonenumber: yup.string().matches(/^0\d{10}$/, 'Phone number must be 11 digits long and start with 0').required('Phone number is required'),
//     address: yup.string().required('Address is required'),
//     nationalNumber: yup.string().matches(/^\d{14}$/, 'National number must be exactly 14 digits long and contain only numbers').required('National number is required'),
//     FathernationalNumber: yup.string().matches(/^\d{14}$/, 'National number must be exactly 14 digits long and contain only numbers').nullable(),
//     MothernationalNumber: yup.string().matches(/^\d{14}$/, 'National number must be exactly 14 digits long and contain only numbers').nullable(),
//     password: yup.string().min(8, 'Password must be at least 8 characters long').matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]{8,}$/, 'Password must contain at least one letter, one number, and one special character').required('Password is required'),
//     confirmPassword: yup.string().oneOf([yup.ref('password'), undefined], 'Passwords must match').required('Confirm password is required'),
//     gender: yup.string().oneOf(['male', 'female'], 'Gender must be either male or female').required('Gender is required'),
//     birthDate: yup.date().max(new Date(), 'Birth date must be a past date').required('Birth date is required'),
//     height: yup.string().required('Height is required'),
//     weight: yup.string().required('Weight is required'),
//     foodAllergy: yup.string().nullable(),
//     motherDisease: yup.string().nullable(),
//     fatherDisease: yup.string().nullable(),
//     bloodGroup: yup.string().nullable(),
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
exports.loginSchema = exports.signupSchema = void 0;
// });
const yup = __importStar(require("yup"));
const minAge = 16;
const today = new Date();
const minDate = new Date(today.getFullYear() - minAge, today.getMonth(), today.getDate());
exports.signupSchema = yup.object().shape({
    firstName: yup.string().required('First name is required'),
    lastName: yup.string().required('Last name is required'),
    email: yup.string().email('Email must be valid').required('Email is required'),
    phonenumber: yup
        .string()
        .matches(/^0\d{10}$/, 'Phone number must be 11 digits long and start with 0')
        .required('Phone number is required'),
    address: yup.string().required('Address is required'),
    nationalNumber: yup
        .string()
        .matches(/^\d{14}$/, 'National number must be exactly 14 digits long and contain only numbers.')
        .required('National number is required'),
    FathernationalNumber: yup.string().matches(/^\d{14}$/, 'National number must be exactly 14 digits long and contain only numbers').nullable(),
    MothernationalNumber: yup.string().matches(/^\d{14}$/, 'National number must be exactly 14 digits long and contain only numbers').nullable(),
    password: yup
        .string()
        .min(8, 'Password must be at least 8 characters long.')
        .matches(/[a-zA-Z]/, 'Password must contain at least one letter.')
        .matches(/\d/, 'Password must contain at least one number.')
        .matches(/[@$!%*?&#]/, 'Password must contain at least one special character.')
        .required('Password is required'),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref('password'), 'Passwords must match'], 'Passwords must match')
        .required('Confirm password is required'),
    gender: yup
        .string()
        .oneOf(['male', 'female'], 'Gender must be one of the following values: male, female')
        .required('Gender is required'),
    birthDate: yup.date().typeError('inavlid date format').max(new Date(), "Birth date cannot be in the future") // ما يكونش تاريخ مستقبلي
        .required('Birth date is required'),
    height: yup.string().required('Height is required'),
    weight: yup.string().required('Weight is required'),
    foodAllergy: yup.string().nullable(),
    motherDisease: yup.string().nullable(),
    fatherDisease: yup.string().nullable(),
    bloodGroup: yup.string().nullable(),
});
exports.loginSchema = yup.object().shape({
    password: yup.string().required('Password is required'),
});
