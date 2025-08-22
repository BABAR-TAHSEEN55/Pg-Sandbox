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
    .catch((err) => console.log("Error while connecting", err));

const CreateUserTable = async () => {
    const result = await client.query(`
CREATE TABLE USERS1(
id SERIAL PRIMARY KEY,
username VARCHAR(100) NOT NULL,
email VARCHAR(100) NOT NULL UNIQUE,
password VARCHAR(100) NOT NULL,
created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP)
`);
    console.log(result);
};
// CreateUserTable();
const InsertQuery = async (
    username: string,
    email: string,
    password: string,
) => {
    const InsertQry =
        "INSERT INTO USERS1 (username,email,password) values($1,$2,$3)";
    const values = [username, email, password];
    try {
        const InsertedQuery = await client.query(InsertQry, values);
        console.log("Query has been inserted successfully", InsertedQuery);
    } catch (error) {
        console.log("Error Inserting ", error);
    } finally {
        await client.end();
    }
};
// InsertQuery("Abdullah", "abdullah@gmail.com", "Abdullah");

const GetData = async (email: string) => {
    const Query = "SELECT * FROM USERS1 WHERE EMAIL=$1";
    try {
        const result = await client.query(Query, [email]);
        if (result.rows.length > 0) {
            console.log("User Found", result.rows[0]);
            // return result.rows[0];
        } else {
            console.log("No User Found ");
            return null;
        }
    } catch (error) {
        console.log("Error while querying", error);
    } finally {
        await client.end();
    }
};

// GetData("super@gmail.com");

//TODO: : Peform SQL Injection
