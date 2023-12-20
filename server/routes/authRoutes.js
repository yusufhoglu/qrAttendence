const express = require('express');
var initial = require('../controllers/initial');
var {getChangePassword,postChangePassword} = require('../controllers/changePassword');
var getHome = require('../controllers/home');
var {getLogin,postLogin} = require('../controllers/login');
var {logOut} = require('../controllers/logout');
var {postPassword,getPassword} = require('../controllers/password');
var {qr} = require('../controllers/qr');
var {reset,postReset} = require('../controllers/reset');
var {verificate,postVerificate} = require('../controllers/verification');
var {auth,authCallBack} = require('../controllers/googleAuthentication');
var {passport} =  require('../config/passport')
var {getSignIn,postSignIn} = require('../controllers/signin');

const router = express.Router();

router.get('/',initial);

router.get('/home',getHome);

router.get('/qr', qr);

router.get('/verificate/:token', verificate);

router.get('/login', getLogin);
router.post('/login', postLogin);

router.get('/signin', getSignIn);
router.post('/signin', postSignIn);

router.get('/logout', logOut);

router.get('/password', getPassword);
router.post('/password',postPassword);

router.get('/reset/:token', reset);
router.post('/reset/:token', postReset);

router.get('/changePassword',getChangePassword);
router.post('/changePassword', postChangePassword);

router.get('/auth/google',auth);
// router.post('auth/google/secrets',postGoogle)

router.get('/auth/google/secrets',
    passport.authenticate('google', { failureRedirect: '/login', failureMessage: true }),
    (req, res)=> {
        req.session.loggedIn = true;
        res.render("index");
});

module.exports = router;