import { PlanetScaleDatabase, drizzle } from "drizzle-orm/planetscale-serverless";
import express from 'express';
import { connect } from "@planetscale/database";
import { PLANET_SCALE_CONFIG } from "../../planetscale.configuration";
import { Connect } from "../db/connection";
import * as schema from '../db/schemas/index';
import { error } from "console";
import { NODE_ENV } from "../config/config";

export class Server {
    app: express.Application;
    port: number;
    db: PlanetScaleDatabase<typeof schema>

    constructor() {
        this.app = express();
        this.port = 3000;
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

        this.app.get('/api/health', (req, res) => {
            res.json({ message: 'Ok', error: false, data: `[${NODE_ENV}] : ${new Date().toISOString()}` });
        })

    }

    configure() {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use(express.static('public'));
        //Enable cors
        this.app.use((req, res, next) => {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
            res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
            next();
        });
    }

}