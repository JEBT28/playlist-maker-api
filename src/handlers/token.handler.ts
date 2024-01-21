import jwt from 'jsonwebtoken';
import { SECRETKEY } from '../config/config';
import { User } from '../db/schemas/user';


export const GenerateToken = (usuario: any) => {
    let token;

    token = jwt.sign({ usuario }, SECRETKEY, { expiresIn: '24h' });

    return token;
}

export const VerifyToken = (token: string): Promise<{ usuario: User } | any> => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, SECRETKEY || "", (err: any, decoded: any) => {
            if (err) {
                reject(err);
            } else {
                resolve(decoded);
            }
        });
    });
}