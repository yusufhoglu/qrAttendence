const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
    try {
        const url = process.env.MONGODB_URL;
        await mongoose.connect(url);
        // mongoose.set("useCreateIndex",true);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
        process.exit(1);
    }
};

module.exports = connectDB;
