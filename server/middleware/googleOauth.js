require('dotenv').config();
const link = require("../config/link");
// const findOrCreate = require("./findOrCreate");
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const {User} = require("../models/userModel");


const googleStrategy = (new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: `http://localhost:3000/auth/google/secrets`
  },
  function(accessToken, refreshToken, profile, cb) {
      // Kullanıcıyı veritabanında ara
      User.findOne({ googleId: profile.id })
      .then((user) => {
        if (user) {
          // Kullanıcı bulunduysa, kullanıcıyı döndür
          return cb(null, user);
        } else {
          // Kullanıcı bulunamadıysa, yeni kullanıcı oluştur
          const newUser = new User({
            googleId: profile.id,
            email: profile.emails[0].value,
            status: true
          });

          // Yeni kullanıcıyı veritabanına kaydet
          newUser.save()
            .then((savedUser) => {
              // Kaydedilen kullanıcıyı döndür
              return cb(null, savedUser);
            })
            .catch((err) => {
              // Hata durumunda hatayı döndür
              return cb(err);
            });
        }
      })
      .catch((err) => {
        // Hata durumunda hatayı döndür
        return cb(err);
      });
  }
    // User.findOrCreate({ googleId: profile.id }, (err, user) => {
    //   console.log(user)
    //   console.log(profile)
    //   // email = profile.emails[0].value;
    //   return cb(err, user);
    // });
  // }
));

module.exports = googleStrategy;