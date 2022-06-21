import express from "express";
import dotenv from 'dotenv';
import { getPreferences } from "./controllers/controllers.js";
import { authoriseToken } from "./middlewares/authoriseToken.js";
dotenv.config();

const app = express();

app.use(express.json());

app.get('/api/tea', authoriseToken, getPreferences);

app.use(authoriseToken);

const PORT = process.env.SERVER_PORT;

app.listen(
    PORT,
    () => {
        console.log(
            `Server is connected and listening to port ${PORT}`
        );
    })