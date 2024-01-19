const Class = require("../models/classModel");
const addClass = async (req, res) => {
  const className = req.body.class;

  const newClass = new Class({
    className: className, //UNİQUE DEĞİLSE HATA ATAR
    students: [],
  });
  await newClass.save();

  res.redirect("/menu");
};

const menu = async (req, res) => {
  console.log("deneme");
  const mobile = req.query.mobile; // Retrieve from query string
  console.log(mobile);
  let classList = [];

  if (mobile) {
    await Class.find({}).then((classes) => {
      res.send({ classList: classes });
    });
  } else {
    await Class.find({}).then((classes) => {
      classes.forEach((element) => {
        classList.push(element.className);
      });
    });
    res.render("menu", { classList: classList });
  }
};
const deleteClass = async (req, res) => {
  const className = req.body.element;
  await Class.findOneAndDelete({ className: className });
  res.redirect("/menu");
};

module.exports = { menu, addClass, deleteClass };
