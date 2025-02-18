"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const verifyToken = require("../middleware/authMiddleware");
const { getprofile } = require("../controllers/authController");
//only patient can access this route
router.get("/patient", (req, res) => {
    res.json({ message: "patient" });
});
//doctor can access this route
router.get("/doctor", (req, res) => {
    res.json({ message: "doctor" });
});
//all users can access this route
router.get("/all", (req, res) => {
    res.json({ message: "all" });
});
router.get("/profile", verifyToken, (req, res) => {
    res.json({ message: "welcome verified user", User: req.user });
});
exports.default = router;
