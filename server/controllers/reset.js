const {User} = require('../models/userModel');
const bcrypt = require("bcrypt");
const saltRounds = 10;

const reset = async (req, res) => {
    const token = req.params.token;
    User.find({resetToken: token, resetTokenExpiration: { $gt: Date.now() } })
        .then((user) => {
            if (!user) {
                return res.render("reset",{ message: "Invalid or expired token.",token:"/reset/"+token});
            }
            res.render("reset",{message:"Change your password",token:"/reset/"+token})
        })
        .catch((err) => {
            console.error(err);
            res.render("reset", { message: "Error occurred while processing your request.",token:"/reset/"+token });
        });
}

const postReset = async (req, res) => {
    const token = req.params.token;
    const password = req.body.password;
    const password2 = req.body.password2;

    User.findOne({ resetToken: token, resetTokenExpiration: { $gt: Date.now() } })
        .then((user) => {
            if(!user) {
                return res.render("reset", { message: "Invalid or expired token.",token:"/reset/"+token });
            }
            if(password.length < 8){
                res.render("reset",{message:"password length must be greater than 7!",token:"/reset/"+token})
            }
            if(password === password2){
                bcrypt.hash(password, saltRounds, (err, hash) => {
                    if (err) {
                        console.error(err);
                        return res.render("reset",{message:"Error occurred while processing your request.",token:"/reset/"+token});
                    }
    
                    user.userPassword = hash;
                    user.resetToken = null;
                    user.resetTokenExpiration = null;
                    user.save();
    
                    res.render("login",{message:"Password reset successful. Please log in with your new password."});
                });
            }else{
                res.render("reset", { message: "Passwords doesn't match",token:"/reset/"+token });
            }
            
        })
        .catch((err) => {
            console.error(err);
            res.render("reset", { message: "Error occurred while processing your request.",token:"/reset/"+token });
        });
}

module.exports = {reset,postReset}