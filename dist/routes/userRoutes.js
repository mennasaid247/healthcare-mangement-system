"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const verifyToken = require("../middleware/authMiddleware");
router.get("/profile", verifyToken, (req, res) => {
    res.json({ message: "welcome verified user" });
});
exports.default = router;
