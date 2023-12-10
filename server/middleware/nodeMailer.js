require('dotenv').config()
const nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'yusuf5335steam@gmail.com',
      pass: process.env.GOOGLE
    }
  });

module.exports = transporter;