import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

/*
1. get the token that is sent to us
2. verify that this is the correct user
3. return user into the 'getPreferences' function
*/
export const authoriseToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    // IF we have an authHeader, then ....
    const token = authHeader && authHeader.split(" ")[1];
    if (token === null) return res.sendStatus(401); // no access

    // here we know we have a valid token, so we need to verify it
    jwt.verify(token, process.env.ACCESS_SECRET, (err, user) => {
        if (err) return res.sendStatus(403); // we see that you have a token, but this token is no longer valid, meaning you don't have access!
        req.user = user;
        next();
    })
}