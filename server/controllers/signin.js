const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const transporter = require('../middleware/nodeMailer')

const saltRounds = 10;
const emailRegex = /^[A-Za-z0-9]+@[A-Za-z0-9]+\.[A-Za-z]{2,}\.edu\.tr$/;

const getSignIn = async (req,res) => {
    if(!req.session.loggedIn){
        res.render("signin",{title:"Sign-in",message:"Welcome!"})
    }else{
        res.redirect("/alert")
    }
}

const postSignIn = async (req,res) => {
    const email = req.body.email;
    const password = req.body.password;
    const password2 = req.body.password2;
   
    //password encrypt
    if(password.length < 8){
        res.render("signin",{title:"Sign-in",message:"password length must be greater than 7!"})
    }else if(!emailRegex.test(email)){
        res.render("signin",{title:"Sign-in",message:"Email is invalid"})
    }
    ///email kontrol et regex!!!
    else{
        if(password===password2){ 
            const verificateToken = crypto.randomBytes(20).toString("hex");
            const verificateTokenExpiration = Date.now() + 3600000; // Token is valid for 1 hour
            bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
                const user = new User({
                    email: email,
                    userPassword: hash,
                    verificateToken:verificateToken,
                    verificateTokenExpiration:verificateTokenExpiration
                })
                user.save()
                .then(()=> {
                    const resetLink = `http://localhost:3000/verificate/${verificateToken}`;
                    const mailOptions = {
                        from: 'yusuf5335steam@gmail.com',
                        to: email,
                        subject: 'Account activation',
                        text: `Click the link to verification: ${resetLink}`
                    };
                    console.log(email)
                    transporter.sendMail(mailOptions, (error, info) => {
                        if (error) {
                            console.log(error);
                        } else {
                            console.log('Email sent: ' + info.response);
                        }
                    });
                    res.render("signin",{message:"Please check your email"})
                    // res.render("login",{message:"You have successfully registered"})
                })
                .catch((err) =>{
                    console.log(err)
                    res.render("signin",{message:"Email already exist!"})
                }) 
            })
        }else{
            res.render("signin",{message:"Passwords doesn't match!"})
        }
    }
    
}

module.exports = {getSignIn,postSignIn}