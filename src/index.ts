import { Client } from "pg";
import dotenv from "dotenv";
dotenv.config();
const client = new Client({
    host: process.env.DB_HOST,
    port: process.envDB_PORT,
});
client
    .connect()
    .then(() => console.log("Connected to DB"))
    .catch((err) => console.log("Erro while connecting", err));
