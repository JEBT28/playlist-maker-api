import { NextFunction, RequestHandler, Request, Response } from "express";
import userService from "../services/user.service";
import brcypt from 'bcrypt';
import { GenerateToken, VerifyToken } from "../../../handlers/token.handler";
import { User } from "../../../db/schemas/user";

export class UserController {
    getUsers(): RequestHandler {
        return async (req: Request, res: Response, next: NextFunction) => {
            try {
                const { limit, offset, order, search, status } = req.query;

                const users = await userService.getUsers({
                    limit: parseInt(limit as string),
                    offset: parseInt(offset as string),
                    order: order as [string, 'asc' | 'desc'],
                    search: search as string,
                    status: Boolean(status),
                });

                res.json({ message: 'Users found', error: false, data: users });
            } catch (e) {
                next(e);
            }
        }
    }

    getUserById(): RequestHandler {
        return async (req: Request, res: Response, next: NextFunction) => {
            try {
                const { user_id } = req.params;
                const user = await userService.getUserById(parseInt(user_id));
                res.json({ message: 'User found', error: false, data: { ...user, password: undefined } });
            } catch (e) {
                next(e);
            }
        }
    }

    createUser(): RequestHandler {
        return async (req: Request, res: Response, next: NextFunction) => {
            try {
                const { password, repassword, ...userData } = req.body;

                if (password !== repassword) {
                    throw new Error('Passwords do not match');
                }

                const encryptedPassword = await brcypt.hash(password, 10);

                userData.password = encryptedPassword;

                const user = await userService.createUser(userData);
                res.json({ message: 'User created', error: false, data: { ...user, password: undefined } });
            } catch (e) {
                next(e);
            }
        }
    }

    updateUser(): RequestHandler {
        return async (req: Request, res: Response, next: NextFunction) => {
            try {
                const { user_id } = req.params;
                const userData = req.body;

                const user = await userService.updateUser(parseInt(user_id), userData);

                res.json({ message: 'User updated', error: false, data: { ...user, password: undefined } });
            } catch (e) {
                next(e);
            }
        }
    }

    deleteUser(): RequestHandler {
        return async (req: Request, res: Response, next: NextFunction) => {
            try {
                const { user_id } = req.params;
                const user = await userService.deleteUser(parseInt(user_id));
                res.json({ message: 'User deleted', error: false, data: { ...user, password: undefined } });
            } catch (e) {
                next(e);
            }
        }
    }

    login(): RequestHandler {
        return async (req: Request, res: Response, next: NextFunction) => {
            try {
                const { val, password } = req.body;
                let user: User | any = await userService.getUserByUsernameOrEmail(val);
                const match = await brcypt.compare(password, user.password);
                if (!match) {
                    throw new Error('Invalid credentials');
                }

                user = { ...user, password: undefined }

                const token = GenerateToken(user);

                res.json({
                    message: 'User logged in', error: false, data: {
                        user,
                        token
                    }
                });
            } catch (e) {
                next(e);
            }
        }
    }

    logout(): RequestHandler {
        return async (req: Request, res: Response, next: NextFunction) => {
            try {
                res.json({ message: 'User logged out', error: false, data: null });
            } catch (e) {
                next(e);
            }
        }
    }

    verify(): RequestHandler {
        return async (req: Request, res: Response, next: NextFunction) => {
            try {
                const { userData } = req;

                res.json({ message: 'Valid Session', error: false, data: userData });
            } catch (e) {
                next(e);
            }
        }
    }
    changePassword(): RequestHandler {
        return async (req: Request, res: Response, next: NextFunction) => {
            try {
                const { user_id } = req.params;
                const { password, newpassword, repassword } = req.body;

                if (newpassword !== repassword) {
                    throw new Error('New Password do not match');
                }

                const encryptedPassword = await brcypt.hash(newpassword, 10);

                let user = await userService.getUserById(parseInt(user_id));

                const match = await brcypt.compare(password, user.password);

                if (!match) {
                    throw new Error('Current password was wrong');
                }

                user = await userService.updateUser(parseInt(user_id), { password: encryptedPassword });

                res.json({ message: 'User updated', error: false, data: { ...user, password: undefined } });
            } catch (e) {
                next(e);
            }
        }
    }
}

export default new UserController()