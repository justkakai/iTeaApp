import jwt from 'jsonwebtoken';

// generates an access token
export function generateAccessToken(user, secret, expTime) {
    return jwt.sign(user, secret, { expiresIn: expTime })
}