// middlewares/authenticateJWT.js
const jwt = require('jsonwebtoken');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET || 'your-jwt-secret';

const authenticateSession = (req, res, next) => {
    const token = req.session.token;
    
    if (token === undefined) {
        return res.status(401).json({ message: 'Please login again. Unauthenticated' });
    }

    try {
        const user = jwt.verify(token, JWT_SECRET);
        req.user = user;
        next();
    } catch (err) {
        return res.status(403).json({ message: 'Please login again. Unauthenticated' });
    }
};

module.exports = authenticateSession;
