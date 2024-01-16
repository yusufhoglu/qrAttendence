const express = require('express');
const bcrypt = require('bcrypt');
const {User} = require('../models/userModel');
const emailRegex = /^[A-Za-z0-9]+@[A-Za-z0-9]+\.[A-Za-z]{2,}\.[A-Za-z]{2,}\.[A-Za-z]{2,}/;
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

const postLoginMobile = async (req, res) => {
    console.log(req.body);
    const email = req.body.email;
    const password = req.body.password;
    console.log(email, password);
  
    await User.findOne({ email })
      .then((user) => {
        bcrypt.compare(password, user.userPassword, (err, result) => {
          if (result === true) {
            if (user.status === true) {
              req.session.email = email;
              req.session.loggedIn = true;
              res.send(req.session);
              // res.redirect("home")
              console.log("giriş yaptı");
            } else {
              res.send({ message: "Your account is not active" });
            }
          } else {
            res.send({ message: "Wrong password" });
          }
        });
      })
      .catch((err) => {
        console.log(err);
        res.send({ message: "Email is not registered" });
      });
  };
  
  module.exports = { getLogin, postLogin, postLoginMobile };
  