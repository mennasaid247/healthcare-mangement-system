import { NextFunction, Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import * as jwt from "jsonwebtoken";
const { JWT_SECRET = "" } = process.env;
interface AuthenticatedRequest extends Request {
  user?: any; 
}


 const verifyToken = (req: AuthenticatedRequest,res: Response,next: NextFunction) => {
  const header = req.headers.authorization || req.headers.Authorization;
  if (!header) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const token = typeof header === "string" ? header.split(" ")[1] : null; //34n klmt Bearer abl el token
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try{
    const decode = jwt.verify(token, JWT_SECRET);
    if (!decode) {
      return res.status(401).json({ message: "You need to be loggedin" });
    }
    // req[" currentUser"] = decode;
    req.user=decode;
    // req.body = { ...req.body, decode };
    // req.currentUser = decode;
    console.log('the decoded user:',req.user);

    next();
}catch(error){
  
    return res.status(400).json({ message: "token is unvalid" });

  }
};
module.exports = verifyToken;




