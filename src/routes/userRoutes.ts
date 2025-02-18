import express, { Request, Response } from 'express';
import { request } from 'http';
const router = express.Router();
const verifyToken = require("../middleware/authMiddleware");
const { getprofile } = require("../controllers/authController");

//only patient can access this route
router.get("/patient",(req:Request,res:Response)=>{
res.json({message:"patient"})
});
//doctor can access this route
router.get("/doctor",(req:Request,res:Response)=>{
  res.json({message:"doctor"})
  
  });
  //all users can access this route
router.get("/all",(req:Request,res:Response)=>{
    res.json({message:"all"})

    
    });
    interface AuthenticatedRequest extends Request {
      user?: any;
    }
    
    router.get("/profile", verifyToken, (req: AuthenticatedRequest, res: Response) => {
      res.json({ message: "welcome verified user", User: req.user});

    });

export default router;
