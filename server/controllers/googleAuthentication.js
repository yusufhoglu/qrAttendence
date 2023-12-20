const express = require('express');
const { model } = require("mongoose");
const {passport} = require("../config/passport");

const auth = passport.authenticate('google', { scope: ['email'] });


// const authCallBack = passport.authenticate('google', { failureRedirect: '/login', failureMessage: true }),
// function(req, res) {
//   res.redirect('/');
// };


module.exports = {auth}
// model.exports = {auth,authCallBack}