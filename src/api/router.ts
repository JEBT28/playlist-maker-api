import { Router } from "express";
import UsersRouter from './users/routes/users.routes'
import { NODE_ENV } from "../config/config";

import { Request, Response } from 'express';

const router = Router();

router.use('/users/', UsersRouter)
router.get('/health', (req: Request, res: Response) => {
    res.json({ message: 'Ok', error: false, data: `[${NODE_ENV}] : ${new Date().toISOString()}` });
})

export default router;
