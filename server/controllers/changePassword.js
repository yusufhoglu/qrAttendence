const passport = require('passport');
const {User} = require('../models/userModel');
const bcrypt = require("bcrypt");
const saltRounds = 10;

const getChangePassword = async (req,res) =>{
    if(req.session.loggedIn){
        res.render("changePassword",{message:"Change your password"})
    }else{
        res.redirect("/")
    }
}

const postChangePassword = async (req,res) =>{
    const email = req.session.email;
    const newPassword = req.body.password;
    const password2 = req.body.password2;

    User.findOne({email})
    .then((user)=>{
        if(newPassword === password2){
            bcrypt.hash(newPassword, saltRounds, (err, hash) => {
                if (err) {
                    console.error(err);
                    return res.render("changePassword", { message: "Error occurred while processing your request." });
                }
        
                user.userPassword = hash;
                user.resetToken = null;
                user.resetTokenExpiration = null;
                user.save();
        
                res.render("login", { message: "Password reset successful. Please log in with your new password." });
            })
        }else{
            res.render("changePassword",{message:"Passwords doesn't match!"})
        }
        
    });
}

module.exports = {getChangePassword,postChangePassword}
