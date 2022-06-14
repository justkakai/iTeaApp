import express from "express";
import dotenv from 'dotenv';
import { getPreferences, loginUser } from "./controllers/controllers.js";
import { authoriseToken } from "./middlewares/authoriseToken.js";
dotenv.config();

const app = express();

app.use(express.json());

app.get('/api/tea', authoriseToken, getPreferences);

app.post('/login', loginUser);

app.use(authoriseToken);

const PORT = process.env.SERVER_PORT;

app.listen(
    PORT,
    () => {
        console.log(
            `Application is connected and listening to port ${PORT}`
        );
    })