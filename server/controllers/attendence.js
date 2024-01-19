const { User } = require("../models/userModel");
const Class = require("../models/classModel");
let attendence = [];
const getAttendence = async (className) => {
  await User.find({
    class: {
       $elemMatch: { className: className, timeStamp: { $gte: Date.now() -10800} },
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
      attendence.forEach(element => {
        if(!newClass.students.includes(element)){
            newClass.students.push(element);
        }
      })
      newClass.save();
    })
    attendence = [];
};

const getStudentList = async (className,list) =>{
  await Class.findOne({className:className})
  .then((newClass) =>{
    console.log(newClass)
    list = newClass.students;
  })
  return list;
}

module.exports = { getAttendence, getStudentList };
