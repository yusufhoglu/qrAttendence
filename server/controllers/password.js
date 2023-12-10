const User = require('../models/userModel');
const crypto = require('crypto');
const transporter = require('../middleware/nodeMailer')

const getPassword = async (req,res)=>{
    res.render("password",{message:"Reset Password"});
}

const postPassword= async (req, res) => {
    const email = req.body.email;
    User.findOne({email})
        .then((user) => {
            if (!user) {
                return res.render("password", { message: "Email is not registered!" });
            }
            // Generate a unique token and set expiration time
            const resetToken = crypto.randomBytes(20).toString("hex");
            const resetTokenExpiration = Date.now() + 3600000; // Token is valid for 1 hour
            // Update user document with the resetToken and expiration time
            user.resetToken = resetToken;
            user.resetTokenExpiration = resetTokenExpiration;
            user.save().then(()=>{
                const resetLink = `todolist-qdpv.onrender.com/reset/${resetToken}`;
                const mailOptions = {
                    from: 'yusuf5335steam@gmail.com',
                    to: email,
                    subject: 'Reset Password',
                    text: `Click the link to reset your password: ${resetLink}`
                };
                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log('Email sent: ' + info.response);
                    }
                });
            })
            res.redirect("/");
        })
        .catch((err) => {
            console.error(err);
            res.render("password", { message: "Error occurred while processing your request." });
        });
}

module.exports = {getPassword,postPassword}