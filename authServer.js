import express from "express";
import dotenv from 'dotenv';
import { createNewToken, loginUser } from "./controllers/controllers.js";
dotenv.config();

const app = express();

app.use(express.json());

app.post('/token', createNewToken)

// we want to create a token here, so post makes more sense than get
app.post('/login', loginUser);

// app.get('/api/tea', authoriseToken, getPreferences);

// app.use(authoriseToken);

const PORT = process.env.AUTH_SERVER_PORT;

app.listen(
    PORT,
    () => {
        console.log(
            `authServer is connected and listening to port ${PORT}`
        );
    })