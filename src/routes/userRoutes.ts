import express, { Request, Response } from 'express';
const router = express.Router();
const verifyToken = require("../middleware/authMiddleware");


router.get("/profile", verifyToken, (req: Request, res: Response) => {
  res.json({ message: "welcome verified user" });
});

export default router;
