const QRCode = require("qrcode");
const { getAttendence,getStudentList } = require("./attendence");
const { User } = require("../models/userModel");
const Class = require("../models/classModel");


// const addClass = (req, res) => {
//   const email = "hocaogluyusuf35@gmail.com";
//   User.findOne({ email }).then((user) => {
//     user.class = {
//       className: "SENG1001",
//       timeStamp: Date.now(),
//     };
//     user.save();
//   });
// };

const qr = async (req, res) => {
  const qrContent = req.params.qr;
  console.log(qrContent);
  const validityDuration = 20000; // 10 saniye
  const expirationTime = Date.now() + validityDuration;
  const token = `${qrContent}|${expirationTime}`;
  getAttendence(qrContent);
  let list = [];
  
  await Class.findOne({className:qrContent})
  .then((newClass) =>{
    list = newClass.students;
  })
  
  QRCode.toDataURL(token)
    .then((url) => {
      res.render("qr", { qr: url, attendence: list, className: qrContent});
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Internal Server Error");
    });
};

setInterval(() => {
  console.log(`QR kod içeriği değiştirildi`);
}, 10000);

const scan = async (req, res) => {
  const { data, email } = req.body;
  const className = data.split("|")[0];
  const timeStamp = Date(parseInt(data.split("|")[1]));
  // console.log("tarama yapıldı", "name:", className, "timestamp:", (timeStamp));
  // console.log(email)
  User.findOne({ email }).then((user) => {
    // console.log(timeStamp)
    user.class = {
      className: className,
      timeStamp: timeStamp,
    };
    // console.log("saveledi")
    user.save();
  });
};

module.exports = { qr, scan };