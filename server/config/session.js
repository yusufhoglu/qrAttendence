const session = require('express-session');
require('dotenv').config();

const sessionConfig = {
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
};

module.exports = session(sessionConfig);