require('dotenv').config();

const express = require('express');

const jwt = require('jsonwebtoken');

const app = express();

app.use(express.json());

const teaPreferences = [
    {
        username: 'Kakai',
        favoriteTeas: ['Masala Chai', 'Jasmine Tea', 'Oolong Tea']
    },
    {
        username: 'Regina',
        favoriteTeas: ['Green Tea', 'Black Tea', 'Pu-erh']
    },
    {
        username: 'Jo Ann',
        favoriteTeas: ['Yellow Tea', 'White Tea', 'Yerba Mate']
    },
    {
        username: 'Iasonas',
        favoriteTeas: ['Sincha Tea', 'Irish Breakfast', 'Hibiscus Tea']
    },
    {
        username: 'Daisy',
        favoriteTeas: ['Chamomile Tea', 'Guayusa Tea', 'Rooibos Tea']
    }
]

/** 
 * @method: GET
 * @description: get posts of the logged user
 * @access: Public
*/
app.get('/api/tea', authoriseToken, (req, res) => {
    res.json(teaPreferences.filter(item => item.username === req.user.name));
})

/** 
 * @method: POST
 * @description: login
 * @access: Public
*/
app.post('/login', (req, res) => {
    const username = req.body.username;
    const user = {
        name: username
    };
    const accessToken = jwt.sign(user, process.env.ACCESS_SECRET);
    res.json({
        accessToken
    });
})

function authoriseToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(" ")[1];
    if (token === null) return res.sendStatus(401);
    jwt.verify(token, process.env.ACCESS_SECRET, (err, user) => {
        if (err) return res.sendStatus(403); 
        req.user = user;
        next();
    })
}

const PORT = process.env.SERVER_PORT;

app.listen(
    PORT,
    () => {
        console.log(
            `Application is connected and listening to port ${PORT}`
        );
    })