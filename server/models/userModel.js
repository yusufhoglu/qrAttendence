const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: { type: String, unique: true },
    studentId: { type: String, unique: true },
    userPassword: String,
    resetToken: String,
    resetTokenExpiration: Date,
    verificateToken:String,
    verificateTokenExpiration: Date,
    status:{type:Boolean, default:false}
});

const User = mongoose.model(`qrUser`, userSchema);

module.exports = User;