
import express, { NextFunction } from 'express';
import { PORT, SECRETKEY } from "../config/config";

import { Request, Response } from 'express';
import { expressjwt as jwt } from 'express-jwt';
import * as ApiRouter from './router';
import { error } from 'console';

export class Server {
    app: express.Application;
    port: number;

    constructor() {
        this.app = express();
        this.port = PORT;
        this.configure();
        this.routes();
    }

    start() {
        this.app.listen(this.port, () => {
            return console.log(`Express is listening at http://localhost:${this.port}`);
        }).on('error', (e) => {
            console.error(e);
        });
    }

    routes() {
        const unprotected = ['/api/users/login', '/api/users/register', '/api/health', '/api/home'];

        this.app.use(jwt({
            secret: SECRETKEY,
            algorithms: ['HS256'],
            requestProperty: 'user',


        }).unless({ path: unprotected }))

        // console.log('Api', ApiRouter)
        this.app.use('/api', ApiRouter.default)
        this.app.use((err: any, req: Request, res: Response, next: NextFunction) => {
            if (err.name === "UnauthorizedError") {
                res.status(401).send({
                    error: true,
                    message: "Unauthorized"
                });
            } else {
                res.status(500).send("Something broke!");
            }
        })
    }

    configure() {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use(express.static('public'));
        //Enable cors
        this.app.use((req: Request, res: Response, next: NextFunction) => {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
            res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
            next();
        });
    }

}