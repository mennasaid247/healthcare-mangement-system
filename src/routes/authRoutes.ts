import express, { Request, Response } from 'express';
const router = express.Router();

// Mock user data
const users = [
    {
        id: 1,
        username: 'testuser',
        password: 'password123' // In a real application, passwords should be hashed
        }
    ];

    router.post('/login', (req: Request, res: Response) => {
       
    });

    export default router;