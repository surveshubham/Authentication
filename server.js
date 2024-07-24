const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const MongoStore = require('connect-mongo');
require('dotenv').config();

const app = express();
const port = 8000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Session setup
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URI,
        collectionName: 'sessions'
    }),
    cookie: {
        secure: false, // Set to true if using https
        maxAge: 1000 * 60 * 60 // 1 hour
    }
}));

// Routes
app.use('/auth', authRoutes);

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
