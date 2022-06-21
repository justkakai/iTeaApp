import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { teaPreferences } from "../datasets/teaPreferences.js";
import { generateAccessToken } from '../middlewares/generateAccessToken.js';
dotenv.config();

let refreshTokens = [];

/** 
 * @method: GET
 * @description: get posts of the logged user
 * @access: Private
*/

export const getPreferences = (req, res) => {
    res.json(teaPreferences.filter(item => item.username === req.user.name));
}

/** 
 * @method: POST
 * @description: login
 * @access: Public
*/

export const loginUser = (req, res) => {
    // assuming the username has been authenticated already
    const username = req.body.username;

    const user = {
        name: username
    }; // payload

    // here we want to serialize a user object which we have created above
    // in order to serialize it, we need some kind of secret key (access secret)
    // secret values created using the following command: require('crypto).randomBytes(64).tostring('hex)
    const accessToken = generateAccessToken(user, process.env.ACCESS_SECRET, '15s');

    // we want to put the same user inside both the access and refresh tokens!
    const refreshToken = jwt.sign(user, process.env.REFRESH_SECRET);

    refreshTokens.push(refreshToken);

    // the access token created has the user information saved inside of it (because of 'sign')

    res.json({
        accessToken,
        refreshToken
    });
}

/** 
 * @method: POST
 * @description: token
 * @access: Private
*/


export const createNewToken = (req, res) => {
    const refreshToken = req.body.token;
    if (refreshToken === null) return res.sendStatus(401);
    if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403);
    jwt.verify(refreshToken, process.env.REFRESH_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        const accessToken = generateAccessToken({ name: user.name }, process.env.ACCESS_SECRET, '15s') // so that we're only passing down the raw user object, without all the extra info such as the issued at date (which we don't need!)
        res.json({ accessToken });
    })
}

