const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./server/routes/authRoutes');
const connectDB = require('./server/config/db');
const session = require('express-session');
const sessionConfig = require('./server/config/session');
const googleStrategy = require('./server/middleware/googleOauth');
const {passport,initializePassport} = require("./server/config/passport");
const {User} = require('./server/models/userModel');
const app = express();
const cors = require('cors'); // Import the cors package

app.use(cors()); // Enable CORS for all routes
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.set('view engine', 'ejs');
app.set('trust proxy', 1);
app.use(sessionConfig);

passport.use(googleStrategy)

// passport.serializeUser(function(user, cb) {
//     console.log("geldi2")
//     process.nextTick(function() {
//       return cb(null, user.id);
//     });
// });

// passport.deserializeUser(function(id, cb) {
//     User.findById(id)
//     .then((err, user)=> {
//         if (err) { return cb(err)};
//         return cb(null, user);
//     });
// });

passport.serializeUser(function(user, done) {
  console.log("geldi")
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  console.log("geldi2");
  User.findById(id)
  .then((user,err)=>{
    done(err, user);
  });
});
// });

app.use(initializePassport);
app.use(passport.session());

connectDB();
app.use('/', authRoutes);

const port = 3000;
app.listen(port|process.env.PORT, () => {
    console.log(`Site listening on port ${port}`);
});
