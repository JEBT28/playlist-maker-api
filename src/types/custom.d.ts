import { User } from "../db/schemas/user";

declare global {
    namespace Express {
        export interface Request {
            userData?: User
        }
    }
}