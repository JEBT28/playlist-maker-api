import { PlanetScaleDatabase, drizzle } from "drizzle-orm/planetscale-serverless";
import express, { NextFunction } from 'express';
import { Connect } from "../db/connection";
import * as schema from '../db/schemas/index';
import { NODE_ENV, PORT } from "../config/config";

import { Request, Response } from 'express';

export class Server {
    app: express.Application;
    port: number;
    db: PlanetScaleDatabase<typeof schema>

    constructor() {
        this.app = express();
        this.port = PORT;
        this.db = Connect();
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

        this.app.get('/api/health', (req: Request, res: Response) => {
            res.json({ message: 'Ok', error: false, data: `[${NODE_ENV}] : ${new Date().toISOString()}` });
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