const express = require('express');
const router = express.Router();
const authenticateJWT = require('../middleware/authenticateJWT');
const authenticateSession = require('../middleware/authenticateSession');
const authController = require('../controllers/authController');
const { register, login, logout } = authController;
const authorizedRole = require('../middleware/authorizedRole');
const roles = require('../utils/roles');

router.post('/register', register);

router.post('/login', login);

router.get('/protected/v1', authenticateJWT, (req, res) => {
    res.json({ message: 'This is a protected route', user: req.user });
});

router.get('/protected', authenticateSession, authorizedRole([roles.ADMIN , roles.USER]) , (req, res) => {
    res.json({ message: 'This is a protected route', user: req.user });
});

router.get('/admin', authenticateSession, authorizedRole([roles.ADMIN]), (req, res) => {
    res.json({ message: 'This is an admin route', user: req.user });
});

router.post('/logout', logout);

module.exports = router;
