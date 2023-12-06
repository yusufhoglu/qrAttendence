require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const bcrypt = require("bcrypt");
const saltRounds = 10;
const port = 3000;
const emailRegex = /^[A-Za-z0-9]+@[A-Za-z0-9]+\.[A-Za-z]{2,}\.edu\.tr$/;

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname+"/public"));
app.set(`view engine`,`ejs`);
app.set("trust proxy", 1);
app.use(session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: true, sameSite: "none" }
  }));

//////////////////////mongoDB
const url = process.env.MONGODB_URL;
mongoose.connect(url,{useNewUrlParser: true})
.then(()=> console.log("Connected!"));

var Schema = mongoose.Schema
const UserSchema = new Schema({
    userId: {type:String, unique: true},
    userPassword: String
})

const User = mongoose.model(`qrUser`,UserSchema);


///////////////

app.get("/",(req,res) => {
    console.log(req.session.loggedIn)
    if(!req.session.loggedIn){
        res.redirect("login")
    }else{
        res.redirect("home")
    }
})

app.get("/login",(req,res) => {
    if(!req.session.loggedIn){
        res.render("login",{message:"Welcome!"})
    }else{
        res.redirect("home")
    }
})


app.post("/login",(req,res)=> {
    const email = req.body.email;
    const password = req.body.password;

    if(!emailRegex.test(email)){
        res.render("login",{title:"Log-in",message:"Email is invalid"})
    }
    User.findOne({userId:email})
    .then((user)=>{
        bcrypt.compare(password,user.userPassword, (err, result) =>{
            if(result === true){
                req.session.email = email;
                req.session.loggedIn = true;
                console.log(req.session.loggedIn)
                res.redirect("home")
            }else{
                res.render("login",{message:"Wrong password"})
            }
        });
    })
    .catch((err)=>{
        res.render("login",{message:"Email is not registered"})
    })
})

app.get("/home",(req,res) => {
    console.log(req.session.loggedIn)
    res.render("index")
})

app.get("/signin",(req,res) => {
    if(!req.session.loggedIn){
        res.render("signin",{title:"Sign-in",message:"Welcome!"})
    }else{
        res.redirect("/alert")
    }
})

app.post("/signin",(req,res) => {
   
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
            bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
                const user = new User({
                    userId: email,
                    userPassword: hash
                })
                user.save()
                .then(()=> {
                    console.log(user.userId)
                    console.log(user.userPassword)
                    res.render("signin",{message:"You have successfully registered"})
                })
                .catch((err) =>{
                    res.render("signin",{message:"Email already exist!"})
                }) 
            })
        }else{
            res.render("signin",{message:"Passwords doesn't match!"})
        }
    }
    
})

app.get("/logout",(req,res)=>{
    req.session.loggedIn = false;
    res.redirect("/login")
})

app.get("/password",(req,res)=>{
    res.render("password",{message:"Reset Password"});
})

app.get("/qr",(req,res) =>{
    res.render("qr")
})

app.post("/password",(req,res)=>{
   const email = req.body.email
})

app.listen(port,()=>{
    console.log(`site listening on port ${port}`);
})