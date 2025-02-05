import * as bcrypt from 'bcrypt';
import * as jwt from "jsonwebtoken";
import { Payload } from "../dto/user.dto";

// import { JWT_SECRET } from "../config";
require('dotenv').config()
// const JWT_SECRET = process.env.JWT_SECRET || 'secret';
const { JWT_SECRET = "" } = process.env;


export class encrypt{

    static async encryptpass(password: string) {
        return bcrypt.hashSync(password, 12);
      }

      static comparepassword(hashPassword: string, password: string) {
        return bcrypt.compareSync(password, hashPassword);
      }
      static generateToken(payload: Payload) {
        return jwt.sign(payload, JWT_SECRET, { expiresIn: "2m" });
      }
}