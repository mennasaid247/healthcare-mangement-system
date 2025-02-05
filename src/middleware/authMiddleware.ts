import { NextFunction, Request, Response } from "express";


import * as jwt from "jsonwebtoken";
const { JWT_SECRET = "" } = process.env;


// Solution 1: When the type of the object is known

 const verifyToken = (req: Request,res: Response,next: NextFunction) => {
  const header = req.headers.authorization || req.headers.Authorization;
  if (!header) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const token = typeof header === "string" ? header.split(" ")[1] : null; //34n klmt Bearer abl el token
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try{const decode = jwt.verify(token, JWT_SECRET);
    if (!decode) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    // req[" currentUser"] = decode;
    req.body = { ...req.body, decode };
    // req.currentUser = decode;
    console.log('the decoded user:',req.body);

    next();
}catch(error){
    return res.status(400).json({ message: "token is unvalid" });
  }
};
module.exports = verifyToken;
