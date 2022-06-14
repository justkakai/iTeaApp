import jwt from 'jsonwebtoken';
import { teaPreferences } from "../datasets/teaPreferences.js";

/** 
 * @method: GET
 * @description: get posts of the logged user
 * @access: Public
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
    const username = req.body.username;
    const user = {
        name: username
    };
    const accessToken = jwt.sign(user, process.env.ACCESS_SECRET);
    res.json({
        accessToken
    });
}