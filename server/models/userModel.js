const mongoose = require('mongoose');
const findOrCreate = require('mongoose-findorcreate')

const userSchema = new mongoose.Schema({
    googleId:{type:String},
    email: { type: String, unique:true},
    studentId: { type: String, default:"falan"},
    // studentId: { type: String, unique: true },
    userPassword: String,
    resetToken: String,
    resetTokenExpiration: Date,
    verificateToken:String,
    verificateTokenExpiration: Date,
    status:{type:Boolean, default:false}
});

userSchema.plugin(findOrCreate)

const User = mongoose.model(`qrUser`, userSchema);

module.exports = {User,userSchema};