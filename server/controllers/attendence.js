const { User } = require("../models/userModel");
const Class = require("../models/classModel");
const { use } = require("passport");
let attendence = [];
const getAttendence = async (className) => {
  await User.find({
    class: {
       $elemMatch: { className: className, timeStamp: { $gte: Date.now() } },
    },
  })
    .then((user) => {
      user.forEach((element) => {
        if (!attendence.includes(element.email)) {
          attendence.push(element.email);
        }
      });
    })
    .catch((err) => {
      console.log(err);
    });

    await Class.findOne({className:className})
    .then((newClass) =>{
      newClass.students = attendence;
      newClass.save();
    })
    attendence = [];
};

const getStudentList = async (className,list) =>{
  await Class.findOne({className:className})
  .then((newClass) =>{
    list = newClass.students;
  })
  return list;
}

module.exports = { getAttendence, getStudentList };
