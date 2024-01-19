const mongoose = require('mongoose');
const findOrCreate = require('mongoose-findorcreate')

const userSchema = new mongoose.Schema({
    googleId:{type:String},
    email: { type: String, unique:true},
    studentId: { type: String, default:"falan"},
    name:{type:String},
    // studentId: { type: String, unique: true },
    userPassword: String,
    resetToken: String,
    resetTokenExpiration: Date,
    verificateToken:String,
    verificateTokenExpiration: Date,
    status:{type:Boolean, default:false},
    class: [
        {
            className:String,
            timeStamp:Date
        }
    ]
});

userSchema.plugin(findOrCreate)

const User = mongoose.model(`qrUser`, userSchema);

module.exports = {User,userSchema};