import * as yup from 'yup';
import { bloodType } from "../enum/bloodTypes";
import express from 'express';
import { Request, Response } from 'express';
import { User } from '../models/User';
import bcrypt from 'bcryptjs';
import { signupSchema,loginSchema } from '../validations/validationSchema';
import { Any } from 'typeorm';
import { encrypt } from "../helper/encrypt";
import { Blacklist } from '../models/Blacklist';
const generateOTP = require('../services/otp.generator');
const { sendEmail } = require('../services/nodemailer')


const signup = async (req:Request, res:Response) => {
  try {

    await signupSchema.validate(req.body, { abortEarly: false });

    const { firstName, lastName, email, phonenumber, address, nationalNumber, FathernationalNumber, MothernationalNumber, password, confirmPassword, gender, birthDate, height, weight, foodAllergy, motherDisease, fatherDisease, bloodGroup } = req.body;
const existingUser = await User.findOne({
      where: [{ email }, { phonenumber }, { nationalNumber }]});   
       if (existingUser) { // 3yza if phone no and national no already exist
      return res.status(400).json({ message: 'This account already exists' });
    }
    const otp = generateOTP();
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
    user.otp_code=otp;
    user.otp_expiration= new Date(Date.now() + 10 * 60 * 1000);
    user.is_verified=false;
    

    const subject = 'Email Verification'
    const message = `Your OTP code is: ${otp}.This code will expire in 10 minutes.`;
    
     sendEmail(user.email, subject, message);
     await user.save();

   return res.status(201).json({ message: `User created successfully with username ${firstName}` });
  } catch (error) {

    if (error instanceof yup.ValidationError) {
        console.error('Validation Error aresss:', error.errors);
        return res.status(400).json({ errors: error.errors });
    }
    console.error('Internal Server Error:', error);
    const err = error as any;
  return res.status(500).json({ message: 'Internal server error', error: err.message });
  }
};
const logout = async (req: Request, res: Response) => {
  const header = req.headers.authorization || req.headers.Authorization;
  const token = typeof header === "string" ? header.split(" ")[1] : null; //34n klmt Bearer abl el token
  if (token)
  {
    const outUser= new Blacklist();
    outUser.token=token;
    await outUser.save();
  }



};

const login = async (req: Request, res: Response) => {
 try{
  await loginSchema.validate(req.body, { abortEarly: false });
  const { email, password,phonenumber } = req.body;
  if(!email && !phonenumber )  {return res.status(400).json({ message: 'Please enter email or phonenumber' });}
  if(email){
    //check if valid format
    const firstUser = await User.findOneBy({email});
    if(!firstUser){{return res.status(400).json({ message: 'Invalid email or password' });}}
    const isPasswordValid = encrypt.comparepassword(firstUser.password, password);
    if(!isPasswordValid){{return res.status(401).json({ message: 'Invalid email or password' });}}
    const token = encrypt.generateToken({ name: firstUser.firstName.concat(firstUser.lastName), email: firstUser.email, role: firstUser.role });
    return res.status(200).header("auth-token", token).json({ message: 'Loggedin successfully',token });

    // return res.status(200).json({ message: 'Loggedin successfully',token });
    
  }
  else if(phonenumber){const firstUser = await User.findOneBy({phonenumber});
  // const firstUser = await User.findOne({ where: { phonenumber:req.body.phonenumber} });

  if(!firstUser){{return res.status(400).json({ message: 'Invalid email or password' });}}
  const isPasswordValid = encrypt.comparepassword(firstUser.password, password);
  if(!isPasswordValid){{return res.status(401).json({ message: 'Invalid email or password' });}}
  const token = encrypt.generateToken({ name: firstUser.firstName.concat(firstUser.lastName), email: firstUser.email, role: firstUser.role });
  return res.status(200).header("auth-token", token).json({ message: 'Loggedin successfully',token }); }
}catch (error) {
    if (error instanceof yup.ValidationError) {
        console.error('Validation Error:', error.errors);
        return res.status(400).json({ errors: error.errors });
    }
    console.error('Internal Server Error:', error);
    }
  };


const resendOTP = async (req: Request, res: Response) =>{
  try{
    const { email } = req.body;
    const newOTP=generateOTP();
    const firstUser = await User.findOneBy({email});
    if(!firstUser){{return res.status(400).json({ message: 'Invalid email' });}}
    firstUser.otp_code=newOTP;
    firstUser.otp_expiration= new Date(Date.now() + 10 * 60 * 1000);
    // console.log('new otp:',firstUser.otp_code);
    // console .log('new otp expiration :',firstUser.otp_expiration);
    //  lazem to be saved in the db
    await firstUser.save();
 const subject = 'Email Verification'
        const message = `Your OTP code is: ${newOTP}`
        sendEmail(email, subject, message);
        return res.status(200).json({ message: 'OTP is resent successfully',firstUser });
  }catch (error) {
    const err = error as any;
    return res.status(500).json({ message: 'Internal server error', error: err.message });
  }


};
const verifyOTP = async (req: Request, res: Response) =>{
  try{
    const { email, otp } = req.body;
    const firstUser = await User.findOneBy({email});
    if(!firstUser){{return res.status(400).json({ message: 'Invalid email' });}}
    if(firstUser.otp_expiration && firstUser.otp_expiration < new Date()){
      return res.status(400).json({ message: 'OTP is expired , please click on resend email' });
    }
    if(firstUser.otp_code === otp && firstUser.otp_expiration && firstUser.otp_expiration >new Date()){
      firstUser.is_verified=true;
      await firstUser.save();
      //generate token to be logged in automatically
      const token = encrypt.generateToken({ name: firstUser.firstName.concat(firstUser.lastName), email: firstUser.email, role: firstUser.role });
      return res.status(200).header("auth-token", token).json({ message: 'Email is verified successfully',firstUser });

}
}
catch (error) {
  const err = error as any;
  return res.status(500).json({ message: 'Internal server error', error: err.message });
}


};
const resetPassword = async (req: Request, res: Response) =>{
  const { email, password, confirmPassword } = req.body;
  try {
    const firstUser = await User.findOneBy({email});
    if(!firstUser){{return res.status(400).json({ message: 'Invalid email' });}}
    if(password !== confirmPassword){{return res.status(400).json({ message: 'Passwords must match' });}}
    const hashedPassword = await bcrypt.hash(password, 10);
    firstUser.password=hashedPassword;
    firstUser.confirmPassword=hashedPassword;
    await firstUser.save();
    const token = encrypt.generateToken({ name: firstUser.firstName.concat(firstUser.lastName), email: firstUser.email, role: firstUser.role });
    return res.status(200).header("auth-token", token).json({ message: 'Password is reset successfully',firstUser });
}
catch (error) {
  const err = error as any;
  return res.status(500).json({ message: 'Internal server error', error: err.message });
}
};


export { signup, login,resendOTP,verifyOTP,resetPassword };