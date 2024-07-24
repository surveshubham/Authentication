// middlewares/authenticateJWT.js
const jwt = require('jsonwebtoken');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET || 'your-jwt-secret';

const authenticateJWT = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (token == null) return res.sendStatus(401);

    try {
        jwt.verify(token, JWT_SECRET, (err, user) => {
            if (err) return res.sendStatus(403);
            req.user = user;
            next();
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = authenticateJWT;


//Not using now for session storage.