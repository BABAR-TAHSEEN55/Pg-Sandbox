import { Client } from "pg";
import dotenv from "dotenv";
dotenv.config();
const client = new Client({
    host: process.env.DB_HOST,
    // port: parseInt(process.env.DB_PORT),
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : undefined,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
});
client
    .connect()
    .then(() => console.log("Connected to DB"))
    .catch((err) => console.log("Erro while connecting", err));
