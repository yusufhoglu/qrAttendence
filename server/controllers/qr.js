const QRCode = require("qrcode");
const { getAttendence, attendence } = require("./attendence");
const { User } = require("../models/userModel");

const addClass = (req, res) => {
  const email = "hocaogluyusuf35@gmail.com";
  User.findOne({ email }).then((user) => {
    user.class = {
      className: "SENG1001",
      timeStamp: Date.now(),
    };
    user.save();
  });
};

const qr = async (req, res) => {
  // QR kodu üret
  // addClass(req,res)
  const qrContent = req.params.qr;
  console.log(qrContent);
  const validityDuration = 20000; // 10 saniye
  const expirationTime = Date.now() + validityDuration;
  const token = `${qrContent}|${expirationTime}`;
  getAttendence(qrContent);
  QRCode.toDataURL(token)
    .then((url) => {
      // QR kodunu tarayıcıya gönder
      res.render("qr", { qr: url, attendence: attendence });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Internal Server Error");
    });
};

setInterval(() => {
  console.log(`QR kod içeriği değiştirildi`);
  console.log(attendence);
}, 10000);

const scan = async (req, res) => {
  const { data, email } = req.body;
  const className = data.split("|")[0];
  const timeStamp = Date(data.split("|")[1]);
  console.log("tarama yapıldı", "name:", className, "timestamp:", Date(timeStamp));
  console.log(email)
  User.findOne({ email }).then((user) => {
    user.class = {
      className: className,
      timeStamp: timeStamp,
    };
    console.log("saveledi")
    user.save();
  });
};

const attendenceControl = async (req, res) => {
  getAttendence("seng");
};

module.exports = { qr, attendenceControl, addClass, scan };
