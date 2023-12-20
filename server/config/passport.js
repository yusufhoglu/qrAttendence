const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const {userSchema} = require("../models/userModel");

const initializePassport = passport.initialize();

userSchema.plugin(passportLocalMongoose);//olmazsa appe taşı

module.exports = {passport,passportLocalMongoose,initializePassport};