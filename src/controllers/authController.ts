// import { Request, Response } from 'express';
import * as yup from 'yup';
import { bloodType } from "../enum/bloodTypes";

// import { signupSchema } from '../validations/validationSchema';
// const { User } = require('../models/User');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');

// const signup=async(req: Request, res: Response) => {
//     try{
//         await signupSchema.validate(req.body, { abortEarly: false });
//         const { firstName, lastName, email, phonenumber, address, nationalNumber, 
//             FathernationalNumber, MothernationalNumber, password, confirmPassword, gender, birthDate, height,
//             weight, foodAllergy, motherDisease, fatherDisease, bloodGroup } = req.body;
//             const existingUser = await User.findOneBy({ email });
//             if (existingUser) {
//                 return res.status(400).json({ message: 'email address is already associated with an account' });
//             }
//             const hashedPassword = await bcrypt.hash(password, 10);  // encryptpassword and adding salt
//             const user = new User({firstName, lastName, email, phonenumber, address, nationalNumber
//                 ,MothernationalNumber, password: hashedPassword,confirmPassword: hashedPassword,gender, birthDate, height, weight, foodAllergy, motherDisease, fatherDisease, bloodGroup,FathernationalNumber});
//                 await user.save();
//                 // const token = generateToken({ id: user.id, email: user.email });

//                 res.status(201).json({ message: `User created successfully with username ${firstName}` });

//             }
//             catch (error: any) {
//                 if (error instanceof yup.ValidationError) {
//                     return res.status(400).json({ errors: error.inner });
//                   }
//                 console.error(error);
//                 res.status(500).json({ message: 'Internal server error', error: error.message });
//             }


    

// } ;
// const login=async(req: Request, res: Response) => {
//     const { email, password } = req.body;
// } ;
// module.exports = { signup, login };
import express from 'express';

import { Request, Response } from 'express';
import { User } from '../models/User';
import bcrypt from 'bcryptjs';
import { signupSchema,loginSchema } from '../validations/validationSchema';
import { Any } from 'typeorm';
import { encrypt } from "../helper/encrypt";


const signup = async (req:Request, res:Response) => {
  try {
    await signupSchema.validate(req.body, { abortEarly: false });

    const { firstName, lastName, email, phonenumber, address, nationalNumber, FathernationalNumber, MothernationalNumber, password, confirmPassword, gender, birthDate, height, weight, foodAllergy, motherDisease, fatherDisease, bloodGroup } = req.body;

    const existingUser = await User.findOne({
      where: [
        { email },
        { phonenumber },
        { nationalNumber }
      ]
    });    if (existingUser) { // 3yza if phone no and national no already exist
      return res.status(400).json({ message: 'This account already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User();
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
    user.bloodType = bloodGroup as bloodType;

    await user.save();

   return res.status(201).json({ message: `User created successfully with username ${firstName}` });
  } catch (error) {
    if (error instanceof yup.ValidationError) {
        console.error('Validation Error:', error.errors);
        return res.status(400).json({ errors: error.errors });
    }
    console.error('Internal Server Error:', error);
    const err = error as any;
  return res.status(500).json({ message: 'Internal server error', error: err.message });
  }
};

const login = async (req: Request, res: Response) => {
 try{
  await loginSchema.validate(req.body, { abortEarly: false });
  const { email, password } = req.body;
  if(!email )  {return res.status(400).json({ message: 'Please enter email or phonenumber' });}
  if(email){
    //check if valid format
    const firstUser = await User.findOneBy({email});
    if(!firstUser){{return res.status(400).json({ message: 'Invalid email or password' });}}
    const isPasswordValid = encrypt.comparepassword(firstUser.password, password);
    if(!isPasswordValid){{return res.status(401).json({ message: 'Invalid email or password' });}}
    const token = encrypt.generateToken({ name: firstUser.firstName.concat(firstUser.lastName), email: firstUser.email, role: firstUser.role });
    return res.status(200).header("auth-token", token).json({ message: 'Loggedin successfully',token });

    // return res.status(200).json({ message: 'Loggedin successfully',token });
    
  }}catch (error) {
    if (error instanceof yup.ValidationError) {
        console.error('Validation Error:', error.errors);
        return res.status(400).json({ errors: error.errors });
    }
    console.error('Internal Server Error:', error);
    const err = error as any;
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

export { signup, login };