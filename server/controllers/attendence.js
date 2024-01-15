const {User} = require('../models/userModel');
const attendence =[];
const getAttendence = (className)=>{
    User.find({ 'class': { $elemMatch: { className: className, timeStamp: { $gte: Date.now() }} }})    
    .then((user)=>{
        user.forEach(element => {
            if(!attendence.includes(element.email)){
                attendence.push(element.email)
            }
        });
    })
    .catch((err)=>{
        console.log(err)
    })
}

module.exports = {getAttendence,attendence}