import express, { Request, Response } from 'express';
const router = express.Router();
const { signup, login } = require("../controllers/authController");

// endpoints for signup &login el howa yktb /login & /signup
//signup
router.post("/signup", signup);
//login
router.post("/login", login);
// module.exports = router;
// const verifyToken = require("../middleware/authMiddleware");




export default router;