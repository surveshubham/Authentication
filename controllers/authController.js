const User = require('../models/user');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET || 'your-jwt-secret';

// Register;
exports.register = async (req, res) => {
    const { username, password, role } = req.body;
    try {
        const user = new User({ username, password, role });
        let findUsername = await User.findOne({ "username": username })
        if (findUsername) {
            return res.status(400).json({ message: 'Username Already Exist' });
        }
        await user.save();
        return res.status(201).json({ message: 'User registered' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// without session 
// Login;
// exports.login = async (req, res) => {
//     const { username, password } = req.body;
//     try {
//         const user = await User.findOne({ username });
//         if (!user || !(await user.comparePassword(password))) {
//             return res.status(401).json({ message: 'Invalid credentials' });
//         }
//         const token = jwt.sign({ id: user._id, username: user.username }, JWT_SECRET, { expiresIn: '1h' });

//         res.json({ token });
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

// login with session and cookies 
exports.login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const token = jwt.sign({ id: user._id, username: user.username, role: user.role }, JWT_SECRET, { expiresIn: '1h' });

        // Store token in session
        req.session.token = token;

        return res.status(201).json({ message: 'User login successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Logout only for session normal logout not created so dont get confuse ;
exports.logout = (req, res) => {
    try {
        req.session.destroy(err => {
            if (err) {
                throw new Error('Unable to log out');
            }
            res.json({ message: 'Logged out successfully' });
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

