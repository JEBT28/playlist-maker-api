
import { z } from "zod"
import dotenv from "dotenv"
dotenv.config({ path: `.env${process.env.NODE_ENV === "prod" ? ".prod" : ""}` })
const envs = process.env
console.log(envs)
export const PORT = z.number().parse(parseInt(envs.PORT ?? "3000"));
export const DATABASE_URL = z.string().parse(envs.DATABASE_URL);
export const DATABASE_HOST = z.string().parse(envs.DATABASE_HOST);
export const DATABASE_PORT = z.number().parse(parseInt(envs.DATABASE_PORT || "3306"));
export const DATABASE_USERNAME = z.string().parse(envs.DATABASE_USERNAME);
export const DATABASE_PASSWORD = z.string().parse(envs.DATABASE_PASSWORD);
export const DATABASE_NAME = z.string().parse(envs.DATABASE_NAME);

export const NODE_ENV = z.string().parse(envs.NODE_ENV || "dev");


