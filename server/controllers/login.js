const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/userModel');
const emailRegex = /^[A-Za-z0-9]+@[A-Za-z0-9]+\.[A-Za-z]{2,}\.edu\.tr$/;
const saltRounds = 10;

const getLogin = async (req, res) => {
    if(!req.session.loggedIn){
        res.render("login",{message:"Welcome!"})
    }else{
        res.redirect("home")
    }
};

const postLogin = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    if(!emailRegex.test(email)){
        res.render("login",{title:"Log-in",message:"Email is invalid"})
    }
    if(User.find({email})){
        console.log("buldu")
    }else{
        console.log(User.findOne({email}))
    }

    await User.findOne({email})
    .then((user)=>{
        bcrypt.compare(password,user.userPassword, (err, result) =>{
            if(result === true){
                if(user.status === true){
                    req.session.email = email;
                    req.session.loggedIn = true;
                    res.redirect("home")
                }else{
                    res.render("login",{message:"Your account is not active"})
                }
            }else{
                res.render("login",{message:"Wrong password"})
            }
        });
    })
    .catch((err)=>{
        console.log(err)
        res.render("login",{message:"Email is not registered"})
    })
};

module.exports = {getLogin,postLogin}