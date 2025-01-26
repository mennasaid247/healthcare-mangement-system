"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
// Mock user data
const users = [
    {
        id: 1,
        username: 'testuser',
        password: 'password123' // In a real application, passwords should be hashed
    }
];
router.post('/login', (req, res) => {
});
exports.default = router;
